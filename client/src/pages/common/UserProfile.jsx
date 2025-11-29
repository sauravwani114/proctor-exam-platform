import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile } from '../../api/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

const UserProfile = () => {
  const { user, token, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const { name, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (password && password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    try {
      const updatedData = { name };
      if (password) updatedData.password = password;

      const data = await updateProfile(updatedData, token);
      
      updateUser(data.user); // Update context
      
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      setFormData({ ...formData, password: '', confirmPassword: '' }); // Clear passwords
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-text mb-2">User Profile</h1>
      <p className="text-text-secondary mb-8">Manage your account settings and preferences.</p>

      <div className="bg-surface rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-3xl mr-4 shadow-sm">
                {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <h2 className="text-xl font-bold text-text">{user?.name}</h2>
                <p className="text-sm text-text-secondary">{user?.email}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-primary rounded-full capitalize">
                    {user?.role}
                </span>
            </div>
        </div>

        <div className="p-8">
            {status.message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.type === 'success' ? <CheckCircle className="mr-2" size={20}/> : <AlertTriangle className="mr-2" size={20}/>}
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-text mb-4">Change Password</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Confirm New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving Changes...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;