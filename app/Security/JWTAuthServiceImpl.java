package Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.typesafe.config.Config;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import models.Exceptions.ResourceException;
import models.User;

import javax.inject.Inject;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

public class JWTAuthServiceImpl implements  JWTAuthService{
    @Inject
    private Config config;

    @Override
    public DecodedJWT verifyToken(String token) throws JWTVerificationException {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(config.getString("static.app.jwtSecret")))
                .withIssuer("www.buukmi.com")
                .build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        return decodedJWT;
    }

    protected String createToken(User user, Date expiresAt){
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        String token = Jwts.builder()
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setIssuer("www.buukmi.com")
                .setAudience("www.buukmi.com")
                .setExpiration(expiresAt)
                .claim("username",user.getClientProfile().getUsername())
                .setSubject(user.getPhoneNr())
                .signWith(signatureAlgorithm,config.getString("static.app.jwtSecret"))
                .compact();
        return token;
    }
    public String getRefreshToken(User user) {
        Date in20Days = Date.from(new Date(System.currentTimeMillis()).toInstant().plus(Duration.ofDays(20)));
        return createToken(user, in20Days);
    }
    public String getNewSessionToken(User user, String refreshToken) throws JWTVerificationException {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(config.getString("static.app.jwtSecret")))
                .withIssuer("www.buukmi.com")
                .build();
        DecodedJWT decodedJWT = jwtVerifier.verify(refreshToken);
        Instant exp = decodedJWT.getExpiresAt().toInstant();
        Date in1Hour = Date.from(new Date(System.currentTimeMillis()).toInstant().plus(Duration.ofHours(1)));
        return createToken(user,in1Hour);
    }
}
