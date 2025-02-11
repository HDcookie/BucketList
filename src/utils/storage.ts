import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../types';

export const saveUser = async (user: User) => {
  try {
    await setDoc(doc(db, 'bucketlists', user.uid), user);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async (uid: string): Promise<User | null> => {
  try {
    const docRef = doc(db, 'bucketlists', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};