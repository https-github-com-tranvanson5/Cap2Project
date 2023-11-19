package com.example.backend.authen.config;

<<<<<<< Updated upstream

import com.example.backend.authen.service.jwt.JwtAuthEntryPoint;
import com.example.backend.authen.service.jwt.JwtAuthTokenFilter;
=======
import com.example.backend.authen.service.jwt.JwtAuthEntryPoint;
import com.example.backend.authen.service.jwt.JwtAuthTokenFilter;
import com.example.backend.authen.service.jwt.PasswordResetJwtAuthTokenFilter;
>>>>>>> Stashed changes
import com.example.backend.authen.service.userdetail.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
    @Bean
    public JwtAuthTokenFilter authenticationJwtTokenFilter() {
        return new JwtAuthTokenFilter();
    }

<<<<<<< Updated upstream
=======
    @Bean
    public PasswordResetJwtAuthTokenFilter customPasswordResetJwtAuthTokenFilter() {
        return new PasswordResetJwtAuthTokenFilter();
    }

>>>>>>> Stashed changes
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
<<<<<<< Updated upstream
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/email/**").permitAll()
                .antMatchers("/api/userManager/getDataListUser").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/userManager/createUserRolePm").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/userManager/getDataListUserByStatus").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/user/getProfileUser").hasAnyAuthority("ROLE_ADMIN","ROLE_PM","ROLE_USER")
                .antMatchers("/api/admin/job/**").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/job/**").permitAll()
                .antMatchers("/api/admin/CurriculumVitae/**").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/crawl/timviec365/crawl").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/crawl/timviec365/getDataTimviec365").permitAll()
                .antMatchers("/api/crawl/careerlink/crawl").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/crawl/careerlink/getDataCareerlink").permitAll()
                .antMatchers("/api/pm/job/getJob").hasAnyAuthority("ROLE_PM")
                .antMatchers("/api/user/CurriculumVitae/createCv").hasAnyAuthority("ROLE_USER")
                .antMatchers("/api/user/CurriculumVitae/updateCv").hasAnyAuthority("ROLE_USER")
                .antMatchers("/api/user/CurriculumVitae/getCvbyIdbyUser").hasAnyAuthority("ROLE_USER")
                .antMatchers("/api/user/CurriculumVitae/getAllCvByUser").hasAnyAuthority("ROLE_USER")
                .antMatchers("/api/admin/CurriculumVitae/getCv").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/admin/CurriculumVitae/getCvbyId").hasAnyAuthority("ROLE_ADMIN")
=======
                .antMatchers("/api/auth/reset-password").hasAnyAuthority("ROLE_ADMIN","ROLE_PM","ROLE_USER")
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/admin/**").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/user/job/**").permitAll()
                .antMatchers("/api/user/**").hasAnyAuthority("ROLE_ADMIN","ROLE_PM","ROLE_USER")
                .antMatchers("/api/user/cv/**").hasAnyAuthority("ROLE_USER")
                .antMatchers("/api/pm/**").hasAnyAuthority("ROLE_PM")
>>>>>>> Stashed changes
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
<<<<<<< Updated upstream
=======
        http.addFilterBefore(customPasswordResetJwtAuthTokenFilter(), UsernamePasswordAuthenticationFilter.class);
>>>>>>> Stashed changes
    }
}