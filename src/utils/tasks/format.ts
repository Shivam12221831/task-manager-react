import type { Timestamp } from "firebase/firestore";

export const formatDateTime = (timestamp: Timestamp | null) => {
    if (timestamp?.seconds) {
        return new Date(timestamp.seconds * 1000).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }
    return "N/A";
};

export const formatDate = (timestamp: string) => {
    if (timestamp !== "-") {
        return new Date(timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }
    return "N/A";
};