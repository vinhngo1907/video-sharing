package com.video_sharing.app.video_sharing_app.Services.Users;


import com.video_sharing.app.video_sharing_app.Entities.UserEntity;
import com.video_sharing.app.video_sharing_app.models.Users.UserDetailsImp;
import com.video_sharing.app.video_sharing_app.repositories.UserRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsImpService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    public UserDetails loadUserById(String id) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("No username found"));
        UserDetailsImp userDetailsImp = new UserDetailsImp();
        BeanUtils.copyProperties(userEntity, userDetailsImp);
        return userDetailsImp;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No username found"));
        UserDetailsImp userDetailsImp = new UserDetailsImp();
        BeanUtils.copyProperties(userEntity, userDetailsImp);
        return userDetailsImp;
    }
}
