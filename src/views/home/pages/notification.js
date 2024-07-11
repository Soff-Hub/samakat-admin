import { Table } from 'antd'
import NavHeader from 'components/shared/NavHeader'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { API_ENDPOINTS } from 'service/ApiEndpoints';
import Client from 'service/Client';

export default function Notification() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState("")
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "name",
      render: (first_name) => <a>{first_name}</a>,
    },
    {
      title: "Nomer",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Xabar",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Nomer",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  async function getOrders() {
    await Client.get(API_ENDPOINTS.EMPLOYEE)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }



  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="px-2 py-3">
      <NavHeader admin={true} title="Bildirishnomalar" />
      <div className="py-3 px-2">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  )
}
