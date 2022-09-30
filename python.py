import firebase_admin

import os

import json

from firebase_admin import credentials, firestore

cred = credentials.Certificate("E:\Downloads\LIBRARY_COCO-1\public\library-dc8f8-firebase-adminsdk-18by5-654d5ce4a8.json")

firebase_admin.initialize_app(cred)

db = firestore.client()

for filename in os.listdir('data'):

    if filename.endswith('Book2.json'):

        collectionName = filename.split('.')[0] # filename minus ext will be used as collection name

        f = open('data/' + filename, 'r')

        docs = json.loads(f.read())

        for doc in docs:

            id = doc.pop('_id', None)

            if id:

                db.collection(collectionName).document(id).set(doc, merge=True)

            else:

                db.collection(collectionName).add(doc)