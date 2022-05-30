import { useEffect, useState } from "react";
import { db } from "../firebase/config";
const useFireStore = (colection, codition) => {
  const [documents, setDocuments] = useState([]);
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

    //     .onSnapshot((snap) => {
    //       const data = snap.docs.map((doc) => ({
    //         ...doc.data(),
    //         id: doc.id,
    //       }));
    //       return data;
    //     });
    //   }, []);

    return unsub;
  }, [colection, codition]);
  return documents;
};

export default useFireStore;
