import { collection, getDocs, setDoc, addDoc } from "firebase/firestore/lite";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";

const DBTest = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [editingUserName, setEditingUserName] = useState("");
  const [editingUserSurname, setEditingUserSurname] = useState("");

  useEffect(() => {
    async function getUsers() {
      const usersCol = collection(db, "123");
      const userSnapshot = await getDocs(usersCol);
      setUsers(
        userSnapshot.docs.map((u) => ({
          id: u.id,
          ...u.data(),
        }))
      );
    }
    getUsers();
  }, []);

  const handleDelete = async (colName, id) => {
    try {
      const ref = doc(db, colName, id);
      await deleteDoc(ref);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete document:", err.message);
    }
  };

  const handleEdit = async (colName, id) => {
    try {
      const ref = doc(db, colName, id);
      const updatedData = {};

      if (editingField === "name" && editingUserName.trim() !== "") {
        updatedData.name = editingUserName;
      }

      if (editingField === "surname" && editingUserSurname.trim() !== "") {
        updatedData.surname = editingUserSurname;
      }

      if (Object.keys(updatedData).length === 0) {
        alert("No valid data to update.");
        return;
      }

      await setDoc(ref, updatedData, { merge: true });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                name: editingField === "name" ? editingUserName : user.name,
                surname:
                  editingField === "surname"
                    ? editingUserSurname
                    : user.surname,
              }
            : user
        )
      );

      setEditingUserId(null);
      setEditingUserName("");
      setEditingUserSurname("");
      setEditingField("");
    } catch (err) {
      console.error("Failed to edit document:", err.message);
    }
  };

  const handleAddUser = async () => {
    try {
      const usersCol = collection(db, "123");
      const newUser = {
        name: editingUserName.trim(),
        surname: editingUserSurname.trim(),
      };

      if (!newUser.name || !newUser.surname) {
        alert("Both name and surname must be provided.");
        return;
      }

      const docRef = await addDoc(usersCol, newUser);

      setUsers((prev) => [...prev, { id: docRef.id, ...newUser }]);
      setEditingUserName("");
      setEditingUserSurname("");
    } catch (err) {
      console.error("Failed to add document:", err.message);
    }
  };

  return (
    <div className="main">
      <div>
        <input
          value={editingUserName}
          onChange={(e) => setEditingUserName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={editingUserSurname}
          onChange={(e) => setEditingUserSurname(e.target.value)}
          placeholder="Surname"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {editingUserId === u.id ? (
              <>
                {editingField === "name" && (
                  <>
                    <input
                      value={editingUserName}
                      onChange={(e) => setEditingUserName(e.target.value)}
                      placeholder="Edit name"
                    />
                    <button
                      onClick={() => {
                        handleEdit("123", u.id);
                      }}
                    >
                      Save
                    </button>
                  </>
                )}
                {editingField === "surname" && (
                  <>
                    <input
                      value={editingUserSurname}
                      onChange={(e) => setEditingUserSurname(e.target.value)}
                      placeholder="Edit surname"
                    />
                    <button
                      onClick={() => {
                        handleEdit("123", u.id);
                      }}
                    >
                      Save
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <b>{u.name}</b> <b>{u.surname}</b>
                <button
                  onClick={() => {
                    setEditingUserName(u.name);
                    setEditingUserSurname(u.surname);
                    setEditingField("name");
                    setEditingUserId(u.id);
                  }}
                >
                  Edit Name
                </button>
                <button
                  onClick={() => {
                    setEditingUserName(u.name);
                    setEditingUserSurname(u.surname);
                    setEditingField("surname");
                    setEditingUserId(u.id);
                  }}
                >
                  Edit Surname
                </button>
              </>
            )}
            <button
              onClick={() => {
                handleDelete("123", u.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DBTest;
