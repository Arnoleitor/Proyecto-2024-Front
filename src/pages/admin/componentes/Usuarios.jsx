import React, { useEffect, useState } from "react";
import { useFetch } from "../../../useHooks/useFetch";
import axios from "axios";
import { Input, Modal, Select, Table, Form, Space, Button, notification, Divider } from "antd";
const { Option } = Select;

const Usuarios = () => {
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [tiposDevia, setTiposDevia] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  const { data: responseUsersData } = useFetch("http://localhost:3000/api/users");
  useEffect(() => {
    if (responseUsersData) setUsers(responseUsersData);
  }, [responseUsersData]);

  const { data: tiposDeviaData } = useFetch("http://localhost:3000/api/tiposdevias");
  useEffect(() => {
    if (tiposDeviaData) setTiposDevia(tiposDeviaData);
  }, [tiposDeviaData]);

  const columnsUsers = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
    },
    {
      title: 'Tipo vía',
      dataIndex: 'tipoVia',
      key: 'tipoVia',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditarUsuario(record)}>Editar</Button>
          <Button onClick={() => handleEliminarUsuario(record._id)} type="default" danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const handleModalEditOkUsuario = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, values);
          setEditUserModalVisible(false);
          form.resetFields();
          setUsers(users.map((user) => (user._id === selectedUser._id ? { ...user, ...values } : user)));
          openNotification('success', 'Usuario actualizado correctamente');
        } catch (error) {
          console.error('Error al actualizar usuario:', error.message);
          openNotification('error', 'Error al actualizar usuario');
        }
      })
      .catch((info) => {
        console.error('Validación fallida:', info);
      });
  };

  const handleModalEditCancel = () => {
    setEditUserModalVisible(false);
    form.resetFields();
  };

  const handleEliminarUsuario = async (id) => {
    Modal.confirm({
      title: 'Confirmar Eliminación',
      content: '¿Estás seguro de que quieres eliminar este usuario?',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/api/users/${id}`);
          setUsers(users.filter((user) => user._id !== id));
          openNotification('success', 'Usuario eliminado correctamente');
        } catch (error) {
          console.error('Error al eliminar usuario:', error.message);
          openNotification('error', 'Error al eliminar usuario');
        }
      },
    });
  };

  const handleEditarUsuario = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      Roles: user.Roles,
      direccion: user.direccion,
      tipoVia: user.tipoVia,
    });
    setEditUserModalVisible(true);
  };

  return (
    <>
    <div className="tablasAdmin">
      <h2>Usuarios registrados</h2>
      <Divider/>
      <Table dataSource={users} columns={columnsUsers} rowKey={(record) => record.id} />
      <Modal
        title="Editar Usuario"
        open={editUserModalVisible}
        onOk={handleModalEditOkUsuario}
        onCancel={handleModalEditCancel}
      >
        <Form form={form} layout="vertical" name="edit-user-form">
          <Form.Item label="Nombre" name="username" initialValue={selectedUser?.username}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue={selectedUser?.email}>
            <Input />
          </Form.Item>
          <Form.Item label="Dirección" name="direccion" initialValue={selectedUser?.direccion}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo de Vía"
            name="tipoVia"
            rules={[{ required: true, message: 'Seleccione el tipo de vía' }]}
            initialValue={selectedUser?.tipoVia}
          >
            <Select>
              {tiposDevia.map((tipo) => (
                <Option key={tipo.id} value={tipo.tipo}>
                  {tipo.tipo}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Roles" name="Roles">
            <Select>
              <Option value={1}>Admin</Option>
              <Option value={2}>Usuario</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    </>
  );
};

export default Usuarios;
