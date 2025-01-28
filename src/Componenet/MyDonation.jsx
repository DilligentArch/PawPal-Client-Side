import React, { useContext } from 'react';
import useDonation from '../Hooks/useDonation';
import { AuthContext } from '../AuthProvider/AuthProvider';

const MyDonation = () => {
    const {donation}=useDonation();
    const {user}=useContext(AuthContext);

  const filt=  donation.filter(donation=>donation.email===user?.email);
    console.log(filt);
    return (
        <div>
            
        </div>
    );
};

export default MyDonation;