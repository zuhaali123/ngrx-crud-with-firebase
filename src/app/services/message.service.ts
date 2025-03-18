import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Message } from '../models/message.model';
import { inject } from '@angular/core';
import { collectionData as rxCollectionData } from 'rxfire/firestore';
import { deleteDoc, doc, setDoc, updateDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore: Firestore = inject(Firestore);

  getMessages(): Observable<Message[]> {
    const messagesCollection = collection(this.firestore, 'messages');
    return rxCollectionData(messagesCollection, { idField: 'id' }) as Observable<Message[]>;
  }

  sendMessage(message: Message): Observable<void> {
    const messagesCollection = collection(this.firestore, 'messages');
    const messageDoc = doc(messagesCollection);
    return from(setDoc(messageDoc, message));
  }

  updateMessage(message: Message): Observable<void> {
    if (!message.id) {
      throw new Error('Message ID is required for updating');
    }
    const messageDoc = doc(this.firestore, `messages/${message.id}`);
    return from(updateDoc(messageDoc, { ...message }));
  }

  deleteMessage(id: string): Observable<void> {
    const messageDoc = doc(this.firestore, `messages/${id}`);
    return from(deleteDoc(messageDoc));
  }
}