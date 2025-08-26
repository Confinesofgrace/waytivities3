import './Category.css';
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

function Category() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const fetchCategories = async () => {
        try {
            const snapshot = await getDocs(collection(db, "categories"));
            const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(cats);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;
        try {
            await addDoc(collection(db, "categories"), {
                name: newCategory,
                books: [],
                createdAt: new Date(),
            });
            setNewCategory("");
            fetchCategories();
            alert("Category created!");
        } catch (err) {
            console.error("Error creating category:", err);
        }
    };

    const handleUpdateCategory = async (id) => {
        if (!editName.trim()) return;
        try {
            const categoryRef = doc(db, "categories", id);
            await updateDoc(categoryRef, { name: editName });
            setEditId(null);
            setEditName("");
            fetchCategories();
            alert("Category updated!");
        } catch (err) {
            console.error("Error updating category:", err);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            const categoryRef = doc(db, "categories", id);
            await deleteDoc(categoryRef);
            fetchCategories();
            alert("Category deleted!");
        } catch (err) {
            console.error("Error deleting category:", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <h3>Manage Categories</h3>
            <input
                id='category-input'
                type="text"
                placeholder="Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />

            <button id="category-button" onClick={handleAddCategory}>
                Add Category
            </button>

            <div style={{ marginTop: "20px" }}>
                <h4>Existing Categories</h4>
                <div className="category-list">
                    {categories.map(cat => (
                        <div key={cat.id} className="category-card">
                            {editId === cat.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="edit-input"
                                    />
                                    <button className="save-btn" onClick={() => handleUpdateCategory(cat.id)}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span>{cat.name}</span>
                                    <button className="edit-btn" onClick={() => { setEditId(cat.id); setEditName(cat.name); }}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteCategory(cat.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
