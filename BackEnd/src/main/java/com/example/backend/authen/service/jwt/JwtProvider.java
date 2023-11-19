package com.example.backend.authen.service.jwt;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
<<<<<<< Updated upstream
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);


    private String jwtSecret="jwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKey";
    private String jwtSecret1="jwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeysdfsdsdsff";
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;


import javax.mail.Session;
import javax.servlet.http.HttpSession;
import java.security.SignatureException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret1}")
    private String jwtSecret;

    @Value("${jwt.secret2}")
    private String passwordResetJwtSecret ;
>>>>>>> Stashed changes


    private int jwtExpiration = 86400;

<<<<<<< Updated upstream
    public String generateJwtToken(Authentication authentication,String action) {
        UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
        if(action== "LOGIN"){

            return Jwts.builder()
                    .setSubject((userPrincipal.getUsername()))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpiration * 1000))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();
        }else {
            return Jwts.builder()
                    .setSubject((userPrincipal.getUsername()))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + 180000))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret1)
                    .compact();
        }

    }

=======
    public String generateJwtToken(Authentication authentication) {
        UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + TimeUnit.DAYS.toMillis(30)))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

    }
>>>>>>> Stashed changes
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
<<<<<<< Updated upstream
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
=======
>>>>>>> Stashed changes
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }

        return false;
    }
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    public String getUserNameFromJwtToken(String token) {

        String userName = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
        return userName;
    }
<<<<<<< Updated upstream
}
=======


    public String generatePasswordResetToken(String username) {
        // Tạo một JWTBuilder
        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + TimeUnit.MINUTES.toMillis(3)))
                .signWith(SignatureAlgorithm.HS512,passwordResetJwtSecret);

        // Tạo token
        String token = jwtBuilder.compact();
        return token;
    }

    public String getUserNameFromResetToken(String token) {

        String userName = Jwts.parser()
                .setSigningKey(passwordResetJwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
        return userName;
    }

    public boolean validatePasswordResetToken(String token) {
        try {
            Jwts.parser().setSigningKey(passwordResetJwtSecret)
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            logger.error("Invalid or expired JWT: " + e.getMessage());
        }
        return false;
    }

}
>>>>>>> Stashed changes
