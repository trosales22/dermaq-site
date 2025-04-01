import { database } from 'config/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

interface QueueItem {
  queueNo: number;
  [key: string]: any;
}

type QueueCallback = (queues: QueueItem[]) => void;

export const listenToQueueData = (csRefno: string | undefined, callback: QueueCallback): () => void => {
  if (!csRefno) return () => {};

  const queueRef = ref(database, `queues/${csRefno}`);

  // Subscribe to Firebase Realtime Database updates
  const unsubscribe = onValue(queueRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const queueArray: QueueItem[] = Object.entries(data)
        .map(([queueNo, details]) => ({
          queueNo: parseInt(queueNo, 10),
          ...details as object,
        }))
        .sort((a, b) => a.queueNo - b.queueNo);

      callback(queueArray);
    } else {
      callback([]);
    }
  });

  return () => off(queueRef, 'value', unsubscribe);
};
