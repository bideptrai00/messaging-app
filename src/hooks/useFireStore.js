import { useEffect, useState } from "react";

import { db } from "../firebase/config";
const useFireStore = (colection, codition) => {
  const [documentss, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = db.collection(colection).orderBy("createdAt");
    if (codition) {
      if (!codition.compareValue || !codition.compareValue.length) {
        return;
      }

      collectionRef = collectionRef.where(
        codition.fieldName,
        codition.operator,
        codition.compareValue
      );
    }

    const unsub = collectionRef.onSnapshot((snap) => {
      const doccuments = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(doccuments);
    });
    return unsub;
  }, [colection, codition]);

  return documentss;
};

export default useFireStore;
