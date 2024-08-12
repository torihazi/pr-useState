import React, { useState } from "react";

interface Address {
  city: string;
  country: string;
  isEditable: boolean;
}

interface User {
  name: string;
  addresses: Address[];
}

function App() {
  const [user, setUser] = useState<User>({
    name: "John Doe",
    addresses: [
      { city: "Tokyo", country: "Japan", isEditable: false },
      { city: "New York", country: "USA", isEditable: false },
    ],
  });

  // const updateName = (newName: string) => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     name: newName,
  //   }));
  // };

  const addAddress = () => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: [
        ...prevUser.addresses,
        { city: "sample", country: "sample", isEditable: false },
      ],
    }));
  };

  const updateAddress = (index: number, newAddress: Address) => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.map((address, i) =>
        i === index
          ? { ...address, city: newAddress.city, country: newAddress.country }
          : address
      ),
    }));
  };

  const toggleAddressEditable = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.map((address, i) =>
        i === index ? { ...address, isEditable: !address.isEditable } : address
      ),
    }));
  };

  const delAddress = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <h3 className="text-xl">ユーザ情報</h3>
      <div className="flex flex-col">
        <div className="flex items-center">
          <p className="mr-2">{user.name}</p>
          <button
            className="flex-grow-0 border p-0.5 rounded hover:bg-slate-300 mr-2 transition"
            onClick={() => addAddress()}
          >
            住所追加
          </button>
        </div>
        {user.addresses.map((address, index) => (
          <div key={index} className="flex items-center">
            {address.isEditable ? (
              <>
                <input
                  value={address.city}
                  onChange={(e) =>
                    updateAddress(index, { ...address, city: e.target.value })
                  }
                  placeholder="City"
                  className="border"
                />
                <input
                  value={address.country}
                  onChange={(e) =>
                    updateAddress(index, {
                      ...address,
                      country: e.target.value,
                    })
                  }
                  placeholder="Country"
                  className="border"
                />
                <button
                  onClick={() => toggleAddressEditable(index)}
                  className="border p-0.5 rounded hover:bg-slate-300 mr-2 transition"
                >
                  完了
                </button>
              </>
            ) : (
              <>
                <div className="mr-2">{`第${index + 1}住所 首都: ${
                  address.city
                } 国名: ${address.country}`}</div>
                <button
                  className="border p-0.5 rounded hover:bg-slate-300 mr-2 transition"
                  onClick={() => toggleAddressEditable(index)}
                >
                  編集
                </button>
                <button
                  className="border p-0.5 rounded hover:bg-slate-300 transition"
                  onClick={() => delAddress(index)}
                >
                  削除
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
