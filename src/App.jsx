import { useState } from 'react';
import Header from './components/Header';
import GalleryCard from './components/GalleryCard';
import AdminModal from './components/AdminModal';
import PasswordModal from './components/PasswordModal';
import { useArtifacts } from './hooks/useArtifacts';

function App() {
  const { artifacts, addArtifact, updateArtifact, deleteArtifact } = useArtifacts();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-10 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-body">

      {/* Shared Header w/ Admin Toggle logic */}
      <Header onTripleTap={() => setIsPasswordPromptOpen(true)} />

      <main className="flex-1 px-4 py-6 w-full max-w-2xl mx-auto">
        {/* Intro */}
        <div className="mb-8 text-center mt-4">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-primary border border-primary/30 rounded-full bg-primary-dim uppercase">
            3D Gallery
          </span>
          <h2 className="font-display text-3xl font-bold text-white mb-2 text-shadow-gold">Featured Artifacts</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Explore the rich history of Thow Kwang through high-fidelity digital twins.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
          {artifacts.map((artifact) => (
            <GalleryCard key={artifact.documentId} artifact={artifact} />
          ))}
          {artifacts.length === 0 && (
            <p className="col-span-1 md:col-span-2 text-center text-gray-500 py-10 border border-dashed border-white/10 rounded-xl">
              No artifacts found. Tap the logo 3 times to add one.
            </p>
          )}
        </div>
      </main>

      {/* Password Prompt Modal */}
      <PasswordModal
        isOpen={isPasswordPromptOpen}
        onClose={() => setIsPasswordPromptOpen(false)}
        onSuccess={() => {
          setIsPasswordPromptOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Secret Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        artifacts={artifacts}
        onAdd={addArtifact}
        onUpdate={updateArtifact}
        onDelete={deleteArtifact}
      />
    </div>
  );
}

export default App;
