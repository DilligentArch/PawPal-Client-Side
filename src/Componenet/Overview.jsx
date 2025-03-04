import React, { useContext } from 'react'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useUsers from '../Hooks/useUsers';
import { AuthContext } from '../AuthProvider/AuthProvider';
import usePetAddBy from '../Hooks/usePetAddBy';
import useCampaign from '../Hooks/useCampaign';
import useDonation from '../Hooks/useDonation';

const Overview = () => {
    const { users } = useUsers();
    const { user } = useContext(AuthContext);
    
    // Pets data is already filtered inside usePetAddBy
    const [pet] = usePetAddBy();

    // Fetch all campaigns & donations, then filter for the logged-in user
    const { camp } = useCampaign();
    const { donation } = useDonation();

    const user_campaigns = camp.filter(c => c.createdBy === user?.email);
    const user_donations = donation.filter(d => d.email === user?.email);

    // Find the logged-in user's details
    const user_me = users.find(me => me.email === user?.email);

    // Data for graph
    const data = [
        { name: 'Pets Added', count: pet.length },
        { name: 'Campaigns Created', count: user_campaigns.length },
        { name: 'Donations Made', count: user_donations.length }
    ];

    return (
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md w-full lg:w-3/5 mt-2 lg:mt-20  mx-auto">
            <h2 className="text-2xl font-bold mb-4 mt-12 lg:mt-16">My Profile</h2>
            {user_me ? (
                <div className="flex items-center gap-6">
                    <img 
                        src={user_me.image || "/default-avatar.png"} 
                        alt="User Profile" 
                        className="w-20 h-20 rounded-full border-4 border-white"
                    />
                    <div className="text-lg space-y-2">
                        <p><span className="font-semibold">Name  :</span> {user_me.name}</p>
                        <p><span className="font-semibold">Email :</span> {user_me.email}</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            {/* Graph Section */}
            <h2 className="text-2xl font-bold my-6">User Activity Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4CAF50" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Overview;
