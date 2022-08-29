import React from 'react';
import { User as FirebaseUser } from '@firebase/auth-types';

type context = {
    user: FirebaseUser | null,
    showModal: boolean
  }
  
  const defaultUser: context = {user: null, showModal: false}
  
  export const UserContext = React.createContext(defaultUser);