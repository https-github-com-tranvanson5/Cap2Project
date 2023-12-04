package com.example.backend.user.service.admin;

import com.example.backend.authen.constain.RoleName;
import com.example.backend.authen.model.Role;
import com.example.backend.authen.repository.RoleRepository;
import com.example.backend.user.constain.UserStatus;
import com.example.backend.user.model.User;
import com.example.backend.user.payload.request.UserFormCreate;
import com.example.backend.user.payload.request.UserFormUpdate;
import com.example.backend.user.payload.response.Count;
import com.example.backend.user.payload.response.CountMonth;
import com.example.backend.user.payload.response.CountStatus;
import com.example.backend.user.payload.response.CountYear;
import com.example.backend.user.payload.response.UserCount;
import com.example.backend.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserAdminServiceImp implements UserAdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleReposetory;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> getUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.ok(user.get());
    }

    @Override
    public ResponseEntity<?> createNewUser(UserFormCreate userFormAdmin) {
        User user = new User();
        BeanUtils.copyProperties(userFormAdmin, user);
        user.setCreateAt(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(userFormAdmin.getPassword()));
        Set<Role> roles = new HashSet<>();
        userFormAdmin.getRoles().forEach(role -> {
            Role userRole;
            switch (role) {
                case "admin":
                    userRole = roleReposetory.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));
                    roles.add(userRole);
                    break;
                case "pm":
                    userRole = roleReposetory.findByName(RoleName.ROLE_PM)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));
                    roles.add(userRole);
                    break;
                case "user":
                    userRole = roleReposetory.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));
                    roles.add(userRole);
                    break;
                default:
                    throw new RuntimeException("Role invalid");
            }
        });
        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseEntity<>("Created new user successfully", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateUser(UserFormUpdate userFormUpdate) {
        Optional<User> user = userRepository.findById(userFormUpdate.getId());
        if (user.isEmpty()) {
            return new ResponseEntity<>("Use not exist", HttpStatus.BAD_REQUEST);
        }
        BeanUtils.copyProperties(userFormUpdate, user.get());
        Set<Role> roles = new HashSet<>();
        userFormUpdate.getRoles().forEach(role -> {
            Role userRole;
            switch (role) {
                case "admin":
                    userRole = roleReposetory.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));
                    roles.add(userRole);
                    break;
                case "pm":
                    userRole = roleReposetory.findByName(RoleName.ROLE_PM)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));
                    roles.add(userRole);
                    break;
                case "user":
                    userRole = roleReposetory.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found."));
                    roles.add(userRole);
                    break;
                default:
                    throw new RuntimeException("Role invalid");
            }
        });
        user.get().setRoles(roles);
        userRepository.save(user.get());
        return new ResponseEntity<>("Update thành công", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> changeStatus(String id, UserStatus status) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return new ResponseEntity<>("Use not exist", HttpStatus.BAD_REQUEST);
        }
        user.get().setStatus(status);
        userRepository.save(user.get());
        return new ResponseEntity<>("Change status thành công", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getMinMaxYear() {
        try {
            return new ResponseEntity<>(userRepository.getMinMaxYear(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getDataUser(String search, Pageable pageable, String column, String sort) {
        // Xác định thông tin sắp xếp
        Sort.Order order = null;
        if ("asc".equalsIgnoreCase(sort)) {
            order = Sort.Order.asc(column);
        }
        if ("desc".equalsIgnoreCase(sort)) {
            order = Sort.Order.desc(column);
        }

        Sort sorting = (order != null) ? Sort.by(order) : Sort.unsorted(); // Sử dụng Sort.unsorted() nếu không có yêu
                                                                           // cầu sắp xếp.

        // Tạo Pageable kết hợp cả phân trang và sắp xếp
        Pageable pageableWithSorting = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sorting);

        Page<User> users = userRepository.getDataUser(search, pageableWithSorting);

        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ResponseEntity.ok(users);
    }

    @Override
    public ResponseEntity<?> countUsser() {
        Count countUser = new Count();
        countUser.setCount((int) userRepository.count());
        return ResponseEntity.ok(countUser);
    }

    public ResponseEntity<?> countUserMonth(int year, UserStatus status) {
        String statusString = (status != null) ? status.toString() : null;
        System.out.println(statusString);

        List<Object[]> listCountMoth = userRepository.countUsersMonth(year, statusString);
        List<CountMonth> countMonths = new ArrayList<>();
        for (Object[] object : listCountMoth) {
            if (object.length >= 2 && object[0] != null && object[1] != null) {
                CountMonth countMonth = new CountMonth();
                int month = ((Number) object[0]).intValue();
                int count = ((Number) object[1]).intValue();

                countMonth.setMonth(month);
                countMonth.setCount(count);

                countMonths.add(countMonth);
            }
        }
        return ResponseEntity.ok(countMonths);
    }

    public ResponseEntity<?> countUserStatus(String userStatus) {
        List<Object[]> objectList = userRepository.countUserByStatus(userStatus);
        Object[] object = Arrays.asList(objectList.get(0)).toArray();
        if (object[0] == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        CountStatus countStatus = new CountStatus();
        BigInteger countBigInteger = (BigInteger) object[1];
        int count = countBigInteger.intValue();
        countStatus.setCount(count);
        countStatus.setStatus((String) object[0]);
        return new ResponseEntity<>(countStatus, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> countUserByYear(UserStatus status) {
        try {
            String statusString = (status != null) ? status.toString() : null;
            List<Object[]> listCountYear = userRepository.countUsersYear(statusString);
            List<CountYear> countYears = new ArrayList<>();

            for (Object[] objects : listCountYear) {
                int year = (Integer) objects[0]; // Change the cast to Integer
                BigInteger countBigInteger = (BigInteger) objects[1];

                CountYear countYear = new CountYear();
                countYear.setYear(year);
                countYear.setCount(countBigInteger.intValue()); // Use BigInteger directly
                countYears.add(countYear);
            }

            return new ResponseEntity<>(countYears, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return new ResponseEntity<>("Error while counting users by year.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<UserCount>> countRole(String role, UserStatus status) {
        try {
            // Chuyển đổi Enum thành chuỗi (String) nếu nó không phải là null
            String statusString = (status != null) ? status.toString() : null;

            // Gọi phương thức countRoleByRoleId từ userRepository (Bạn cần cung cấp các tham số phù hợp nếu cần)
            List<Object[]> counts = userRepository.countRoleByRoleId(role,statusString);

            // Tạo danh sách mới để chứa đối tượng được chuyển đổi
            List<UserCount> userCounts = new ArrayList<>();

            // Duyệt qua danh sách Object[] và chuyển đổi thành đối tượng UserCount
            for (Object[] count : counts) {
                String roleValue = (String) count[0];
                int countValue = ((Number) count[1]).intValue(); // Chuyển đổi về kiểu int

                UserCount userCount = new UserCount();
                userCount.setRole(roleValue);
                userCount.setCount(countValue);
                userCounts.add(userCount);
            }

            // Trả về danh sách đối tượng đã chuyển đổi trong ResponseEntity
            return new ResponseEntity<>(userCounts, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace(); // Ghi log cho mục đích gỡ lỗi
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
