import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export function useArtifacts() {
    const [artifacts, setArtifacts] = useState([]);

    // Listen to real-time updates from Firestore
    useEffect(() => {
        const artifactsQuery = query(
            collection(db, "artifacts"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(artifactsQuery, (snapshot) => {
            const artifactList = snapshot.docs.map(doc => ({
                documentId: doc.id, // Firestore internal ID
                ...doc.data()
            }));
            setArtifacts(artifactList);
        });

        return () => unsubscribe();
    }, []);

    const addArtifact = async (artifact) => {
        try {
            // Artifact contains: id (sketchfab), title, desc
            await addDoc(collection(db, "artifacts"), {
                ...artifact,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error adding artifact: ", error);
        }
    };

    const updateArtifact = async (documentId, updatedFields) => {
        try {
            const artifactRef = doc(db, "artifacts", documentId);
            await updateDoc(artifactRef, updatedFields);
        } catch (error) {
            console.error("Error updating artifact: ", error);
        }
    };

    const deleteArtifact = async (documentId) => {
        try {
            const artifactRef = doc(db, "artifacts", documentId);
            await deleteDoc(artifactRef);
        } catch (error) {
            console.error("Error deleting artifact: ", error);
        }
    };

    return { artifacts, addArtifact, updateArtifact, deleteArtifact };
}
