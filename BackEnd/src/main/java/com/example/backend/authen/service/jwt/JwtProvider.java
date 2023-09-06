package com.example.backend.authen.service.jwt;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);


    private String jwtSecret="jwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKey";
    private String jwtSecret1="jwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeyjwtGrokonezSecretKeysdfsdsdsff";


    private int jwtExpiration = 86400;

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

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
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

    public String getUserNameFromJwtToken(String token) {

        String userName = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
        return userName;
    }
}