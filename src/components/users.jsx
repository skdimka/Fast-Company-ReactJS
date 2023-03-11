import React from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import api from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => setUsers(users.filter((user) => user._id !== userId));

    const renderPhrase = (number) =>{
        const lastOne = Number(number.toString().slice(-1));
        if(number > 4 && number < 15) return "человек";
        if([2,3,4].indexOf(lastOne) >= 0) return "человека"
        return "человек"
        
    };

    return (
        <>
        <h2><span className={"badge bg-"+(users.length> 0 ? "primary" : "danger")}
            >
                {users.length>0 ? `Готовы к свиданию ${users.length} ${renderPhrase(users.length)} ` : 'Вы сегодня одиноки'}
            
            </span>
            </h2>
        {users.length > 0 && (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Количество встреч</th>
                        <th scope="col">Оценка</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                            {user.qualities.map((item) => (
                                <span className={"badge m-1 bg-" + item.color} key={item._id}>
                                    {item.name}
                                </span>
                            ))}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate} /5</td>
                        <td>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="btn btn-danger"
                            >
                                delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        )}
    </>
);
};

export default Users;