import { useState } from 'react';

export default function PasswordModal({ isOpen, onClose, onSuccess }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'thowkwang1965') {
            setPassword('');
            setError('');
            onSuccess();
        } else {
            setError('Incorrect password');
        }
    };

    const handleClose = () => {
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-surface-dark border border-primary/30 rounded-2xl w-full max-w-sm p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-display font-bold text-white mb-2">Admin Security</h3>
                <p className="text-sm text-gray-400 mb-6">Enter password to manage exhibits.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter password..."
                            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                            autoFocus
                        />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-primary text-black font-bold rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
                        >
                            Unlock
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
