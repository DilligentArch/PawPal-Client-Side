import React, { useContext } from 'react'; 
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts';
import useUsers from '../Hooks/useUsers';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useCampaign from '../Hooks/useCampaign';
import useDonation from '../Hooks/useDonation';
import usePets from '../Hooks/usePets';

const AdminOverview = () => {
    const { users } = useUsers();
    const { user } = useContext(AuthContext);
    
    // Fetch all pets, campaigns, and donations
    const [ pet ] = usePets();
    const { camp } = useCampaign();
    const { donation } = useDonation();

    // Find the logged-in admin's details
    const user_me = users.find(me => me.email === user?.email);

    // Colors
    const COLORS = ['#FF5733', '#33FF57', '#3385FF'];

    return (
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md w-full lg:w-3/5 mx-auto h-[80rem] lg:mt-20">
            <h2 className="text-2xl font-bold mb-4 mt-12">Admin Profile</h2>
            {user_me ? (
                <div className="flex items-center gap-6">
                    <img 
                        src={user_me.image || "/default-avatar.png"} 
                        alt="Admin Profile" 
                        className="w-20 h-20 rounded-full border-4 border-white"
                    />
                    <div className="text-lg space-y-2">
                        <p><span className="font-semibold">Name  :</span> {user_me.name}</p>
                        <p><span className="font-semibold">Email :</span> {user_me.email}</p>
                        <p><span className="font-semibold">Role  :</span> Admin</p>
                    </div>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            {/* Graph Sections */}
            <h2 className="text-2xl font-bold my-6">Admin Statistics</h2>

            {/* Line Chart - Pets Added Over Time */}
            <h3 className="text-xl font-semibold mt-4">Pets Added</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={[{ name: "Pets", value: pet.length }]}>
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#FF5733" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>

            {/* Bar Chart - Campaigns Created */}
            <h3 className="text-xl font-semibold mt-4">Campaigns Created</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[{ name: "Campaigns", value: camp.length }]}>
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#33FF57" barSize={50} />
                </BarChart>
            </ResponsiveContainer>

            {/* Pie Chart - Donations */}
            <h3 className="text-xl font-semibold mt-4">Donations</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie 
                        data={[{ name: "Donations", value: donation.length }]} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={100} 
                        dataKey="value" 
                        label
                    >
                        <Cell fill={COLORS[2]} />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminOverview;
