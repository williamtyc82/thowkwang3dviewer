import { useState, useEffect } from "react";

const STARTER_ARTIFACTS = [];

export function useArtifacts() {
    const [artifacts, setArtifacts] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("thowkwang_artifacts");
        if (stored) {
            setArtifacts(JSON.parse(stored));
        } else {
            setArtifacts(STARTER_ARTIFACTS);
            localStorage.setItem("thowkwang_artifacts", JSON.stringify(STARTER_ARTIFACTS));
        }
    }, []);

    // Update artifacts and trigger save
    const saveArtifacts = (newArtifacts) => {
        setArtifacts(newArtifacts);
        localStorage.setItem("thowkwang_artifacts", JSON.stringify(newArtifacts));
    };

    const addArtifact = (artifact) => {
        saveArtifacts([artifact, ...artifacts]);
    };

    const updateArtifact = (id, updatedFields) => {
        saveArtifacts(
            artifacts.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
        );
    };

    const deleteArtifact = (id) => {
        saveArtifacts(artifacts.filter((a) => a.id !== id));
    };

    return { artifacts, addArtifact, updateArtifact, deleteArtifact };
}
