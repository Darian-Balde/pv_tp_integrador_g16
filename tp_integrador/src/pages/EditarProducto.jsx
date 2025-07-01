import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductForm from "../components/ProductForm";
import { update, remove } from "../store/ProductsSlice";
import { useAlert } from "../components/AlertContext";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const producto = useSelector((state) =>
    state.products.entities.find((p) => p.id === parseInt(id))
  );

  const [showModal, setShowModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  if (!producto) return <p>Producto no encontrado</p>;

  const handleEdit = (product) => {
    if (product._delete) {
      setPendingDelete(product);
      setShowModal(true);
    } else {
      dispatch(update(product));
      showAlert("Producto editado correctamente", "success");
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const confirmDelete = () => {
    dispatch(remove(pendingDelete.id));
    setShowModal(false);
    showAlert("Producto eliminado correctamente", "danger");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <>
      <ProductForm initialData={producto} onSubmit={handleEdit} />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar este producto? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarProducto;
