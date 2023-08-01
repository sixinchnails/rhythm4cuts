//package com.b109.rhythm4cuts.model.repository;
//
//import com.b109.rhythm4cuts.model.domain.RefreshToken;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//
//@Repository
//public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
//    Optional<RefreshToken> findByUserId(Long userId);
//    Optional<RefreshToken> findByRefreshToken(String refreshToken);
//}