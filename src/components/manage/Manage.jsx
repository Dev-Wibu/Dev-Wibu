import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manage.css";

function Manage() {
  // State lưu danh sách tài khoản
  const [accounts, setAccounts] = useState([]);
  // State cho dữ liệu tài khoản mới (thêm mới)
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  // State tìm kiếm
  const [search, setSearch] = useState("");
  // State xác định tài khoản đang được chỉnh sửa (update)
  const [editingAccount, setEditingAccount] = useState(null);
  // State lưu thông tin cập nhật cho tài khoản (update)
  const [updateUser, setUpdateUser] = useState({ username: "", password: "" });

  //Loading list
  useEffect(() => {
    axios
      .get("http://localhost:3001/accounts")
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error("Lỗi:", error));
  }, []);

  //Add
  const addAccount = () => {
    axios
      .post("http://localhost:3001/accounts", newUser)
      .then((response) => setAccounts([...accounts, response.data]))
      .catch((error) => console.error("Lỗi:", error));
  };

  //Delete
  const deleteAccount = (id) => {
    axios
      .delete(`http://localhost:3001/accounts/${id}`)
      .then(() => setAccounts(accounts.filter((acc) => acc.id !== id)))
      .catch((error) => console.error("Lỗi:", error));
  };

  //Update
  const updateAccount = (id) => {
    axios
      .put(`http://localhost:3001/accounts/${id}`, updateUser)
      .then((response) => {
        setAccounts(
          accounts.map((acc) => (acc.id === id ? response.data : acc))
        );
        // Reset lại state update
        setEditingAccount(null);
        setUpdateUser({ username: "", password: "" });
      })
      .catch((error) => console.error("Lỗi:", error));
  };

  return (
    <div className="manage">
      <h1>Manage Accounts</h1>

      {/* Search */}
      <input
        type="text"
        className="search-box"
        placeholder="Tìm kiếm tài khoản..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/*List accounts*/}
      <table className="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {accounts
            .filter((acc) =>
              acc.username.toLowerCase().includes(search.toLowerCase())
            )
            .map((acc) =>
              editingAccount === acc.id ? (
                // Nếu tài khoản đang được chỉnh sửa: hiển thị form chỉnh sửa
                <tr key={acc.id}>
                  <td>{acc.id}</td>
                  <td>
                    <input
                      type="text"
                      className="edit-input"
                      value={updateUser.username}
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          username: e.target.value,
                        })
                      }
                      placeholder="Username"
                    />
                    <input
                      type="password"
                      className="edit-input"
                      value={updateUser.password}
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          password: e.target.value,
                        })
                      }
                      placeholder="Password"
                    />
                  </td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => updateAccount(acc.id)}
                    >
                      Lưu
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        setEditingAccount(null);
                        setUpdateUser({ username: "", password: "" });
                      }}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ) : (
                // Nếu không phải tài khoản đang chỉnh sửa: hiển thị thông tin và các nút thao tác
                <tr key={acc.id}>
                  <td>{acc.id}</td>
                  <td>{acc.username}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => {
                        setEditingAccount(acc.id);
                        // Pre-fill dữ liệu hiện tại cho form cập nhật
                        setUpdateUser({ username: acc.username, password: "" });
                      }}
                    >
                      Cập nhật
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAccount(acc.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>

   
      <h3>Thêm Account</h3>
      <div className="form-container">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
        />
        <button className="add-btn" onClick={addAccount}>
          Thêm
        </button>
      </div>
    </div>
  );
}

export default Manage;
