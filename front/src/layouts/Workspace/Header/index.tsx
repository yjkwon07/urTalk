import React, { useCallback, useState, VFC } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import Menu from '@components/atoms/Menu';
import {
  Container,
  ImgButton,
  LogOutButton,
  ProfileImg,
  ProfileMenu,
  RightMenu,
} from '@layouts/Workspace/Header/styles';
import { logout as logoutAPI } from '@API/user';
import fetcher from '@utils/fetcher';
import { USER_FETCH } from '@utils/swrConstants';
import { IUser } from '@typings/db';

const Header: VFC = () => {
  const { data: userData, mutate } = useSWR<IUser | false>(USER_FETCH, fetcher);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleToggleProfileMenu = useCallback(() => {
    setShowProfileMenu((prev) => !prev);
  }, []);

  const handleCloseProfileMenu = useCallback((e) => {
    e.stopPropagation();
    setShowProfileMenu(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutAPI();
      mutate(false, false);
    } catch (err) {
      console.dir('err :>> ', err);
    }
  }, [mutate]);

  return (
    <Container>
      <RightMenu>
        {userData && (
          <>
            <ImgButton onClick={handleToggleProfileMenu}>
              <ProfileImg src={gravatar.url(userData.nickname, { s: '28px', d: 'retro' })} alt={userData.nickname} />
            </ImgButton>
            {showProfileMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showProfileMenu} onClose={handleCloseProfileMenu}>
                <ProfileMenu>
                  <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileMenu>
                <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </>
        )}
      </RightMenu>
    </Container>
  );
};

export default Header;