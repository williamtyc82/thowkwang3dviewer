import { useState } from 'react';

export default function AdminModal({ isOpen, onClose, artifacts, onAdd, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ id: '', title: '', desc: '' });

    if (!isOpen) return null;

    const handleEdit = (artifact) => {
        setEditingId(artifact.id);
        setFormData(artifact);
    };

    const handleSave = () => {
        if (!formData.title || !formData.id) return;

        if (editingId) {
            onUpdate(editingId, formData);
        } else {
            onAdd(formData);
        }
        setFormData({ id: '', title: '', desc: '' });
        setEditingId(null);
    };

    const handleCancel = () => {
        setFormData({ id: '', title: '', desc: '' });
        setEditingId(null);
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-surface-dark border border-primary/30 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col mx-auto my-auto max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 sticky top-0 bg-surface-dark z-10 rounded-t-2xl">
                    <h2 className="text-xl font-display font-bold text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined">admin_panel_settings</span>
                        Museum Admin
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">

                    {/* Edit/Add Form */}
                    <div className="bg-black/20 p-4 rounded-xl mb-6 border border-white/5">
                        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                            {editingId ? "Edit Artifact" : "Add New Artifact"}
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Sketchfab ID</label>
                                <input
                                    type="text"
                                    value={formData.id}
                                    disabled={!!editingId} // Cannot change ID of existing, must delete and recreate
                                    onChange={e => setFormData({ ...formData, id: e.target.value })}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none disabled:opacity-50"
                                    placeholder="e.g. 508d6c81387d4040..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
                                    placeholder="Artifact Title"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={formData.desc}
                                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none min-h-[80px]"
                                    placeholder="Description..."
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-primary text-black font-bold py-2 rounded-lg hover:bg-white transition-colors"
                                >
                                    {editingId ? "Save Changes" : "Add Artifact"}
                                </button>
                                {editingId && (
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 bg-transparent border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* List of existing */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                            Existing Entries ({artifacts.length})
                        </h3>
                        {artifacts.map(art => (
                            <div key={art.id} className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-white/5">
                                <div className="min-w-0 pr-4">
                                    <p className="font-bold text-white text-sm truncate">{art.title}</p>
                                    <p className="text-xs text-gray-500 font-mono mt-0.5 truncate">{art.id}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => handleEdit(art)}
                                        className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded"
                                        title="Edit"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button
                                        onClick={() => onDelete(art.id)}
                                        className="p-1.5 text-red-400 hover:bg-red-400/10 rounded"
                                        title="Delete"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {artifacts.length === 0 && (
                            <p className="text-gray-500 text-sm text-center py-4">No artifacts configured.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
