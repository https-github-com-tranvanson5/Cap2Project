package com.example.backend.authen.service.userdetail;

<<<<<<< Updated upstream
import com.example.backend.user.contains.UserStatus;
=======
import com.example.backend.user.constain.UserStatus;
>>>>>>> Stashed changes
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username or email : " + username));
        if (user.getStatus() == UserStatus.BLOCK) {
            throw new LockedException("Account has been locked");
        }
        return UserPrinciple.build(user);
    }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
}