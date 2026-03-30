import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faTrash,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faTimes,
  faPlus,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { selectCategories } from "../../redux/reducers/Categories/selectors";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from "../../redux/reducers/Categories/querries";
import {
  AdminPanelContainer,
  AdminPanelTitle,
  CategoryCard,
  CategoryRow,
  CategoryName,
  AvailabilityBadge,
  IconButton,
  SubCategoryPanel,
  SubCategoryArea,
  SubCategoryTag,
  SubCategoryInline,
  FormField,
  FormSelect,
  FormLabel,
  FormGroup,
  AddCategoryForm,
  SubmitButton,
  AddButton,
} from "./category-admin.style";

const AVAILABILITY_CYCLE = { always: "midi", midi: "soir", soir: "always" };

const EMPTY_FORM = {
  name: "",
  slug: "",
  availableAt: "always",
  title: "",
  legend: "",
};

const CategoryAdmin = () => {
  const categories = useSelector(selectCategories);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const token = user?.token;

  const [expandedSlug, setExpandedSlug] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newSubName, setNewSubName] = useState("");
  const [newSubSlug, setNewSubSlug] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  const handleStartEdit = (cat) => {
    setEditingId(cat._id);
    setEditForm({
      name: cat.name || "",
      slug: cat.slug || "",
      title: cat.title || "",
      legend: cat.legend || "",
      availableAt: cat.availableAt || "always",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = (cat) => {
    updateCategory({ _id: cat._id, ...editForm }, dispatch, token);
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleVisible = (cat) => {
    updateCategory({ _id: cat._id, isVisible: !cat.isVisible }, dispatch, token);
  };

  const handleCycleAvailability = (cat) => {
    const next = AVAILABILITY_CYCLE[cat.availableAt] ?? "always";
    updateCategory({ _id: cat._id, availableAt: next }, dispatch, token);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const items = categories.map((cat, i) => {
      if (i === index) return { _id: cat._id, order: categories[index - 1].order };
      if (i === index - 1) return { _id: cat._id, order: categories[index].order };
      return { _id: cat._id, order: cat.order };
    });
    reorderCategories(items, dispatch, token);
  };

  const handleMoveDown = (index) => {
    if (index === categories.length - 1) return;
    const items = categories.map((cat, i) => {
      if (i === index) return { _id: cat._id, order: categories[index + 1].order };
      if (i === index + 1) return { _id: cat._id, order: categories[index].order };
      return { _id: cat._id, order: cat.order };
    });
    reorderCategories(items, dispatch, token);
  };

  const handleDelete = (cat) => {
    if (window.confirm(`Supprimer la catégorie "${cat.name}" ?`)) {
      deleteCategory(cat._id, dispatch, token);
    }
  };

  const handleAddSubCategory = (cat) => {
    if (!newSubName || !newSubSlug) return;
    const updated = [
      ...(cat.subCategory ?? []),
      { name: newSubName, slug: newSubSlug },
    ];
    updateCategory({ _id: cat._id, subCategory: updated }, dispatch, token);
    setNewSubName("");
    setNewSubSlug("");
  };

  const handleRemoveSubCategory = (cat, scSlug) => {
    const updated = cat.subCategory.filter((sc) => sc.slug !== scSlug);
    updateCategory({ _id: cat._id, subCategory: updated }, dispatch, token);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "name") {
        next.slug = value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
      return next;
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!form.name || !form.slug) return;
    addCategory(form, dispatch, token);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <AdminPanelContainer>
      <AdminPanelTitle>Catégories</AdminPanelTitle>

      {categories.map((cat, index) => (
        <CategoryCard key={cat._id} invisible={!cat.isVisible}>
          <CategoryRow>
            <IconButton
              type="button"
              onClick={() =>
                setExpandedSlug(expandedSlug === cat.slug ? null : cat.slug)
              }
            >
              <FontAwesomeIcon
                icon={expandedSlug === cat.slug ? faChevronDown : faChevronRight}
                size="sm"
              />
            </IconButton>

            <CategoryName invisible={!cat.isVisible}>{cat.name}</CategoryName>

            <AvailabilityBadge
              type="button"
              slot={cat.availableAt}
              onClick={() => handleCycleAvailability(cat)}
            >
              {cat.availableAt}
            </AvailabilityBadge>

            <IconButton type="button" onClick={() => handleToggleVisible(cat)}>
              <FontAwesomeIcon
                icon={cat.isVisible ? faEye : faEyeSlash}
                color={cat.isVisible ? "#777758" : "#ccc"}
              />
            </IconButton>

            <IconButton
              type="button"
              onClick={() => handleStartEdit(cat)}
              title="Modifier"
            >
              <FontAwesomeIcon icon={faPen} size="sm" color="#f4ba9a" />
            </IconButton>

            <IconButton
              type="button"
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
            >
              <FontAwesomeIcon icon={faChevronUp} size="sm" />
            </IconButton>

            <IconButton
              type="button"
              onClick={() => handleMoveDown(index)}
              disabled={index === categories.length - 1}
            >
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            </IconButton>

            <IconButton type="button" onClick={() => handleDelete(cat)}>
              <FontAwesomeIcon icon={faTrash} color="#e53935" />
            </IconButton>
          </CategoryRow>

          {/* Edit form inline */}
          {editingId === cat._id && (
            <SubCategoryPanel>
              <FormLabel style={{ marginBottom: 10 }}>Modifier la catégorie</FormLabel>
              <div style={{ display: "grid", gap: 10 }}>
                <SubCategoryInline>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Nom</FormLabel>
                    <FormField
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                    />
                  </FormGroup>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Slug</FormLabel>
                    <FormField
                      name="slug"
                      value={editForm.slug}
                      onChange={handleEditChange}
                    />
                  </FormGroup>
                </SubCategoryInline>
                <SubCategoryInline>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Titre de page</FormLabel>
                    <FormField
                      name="title"
                      placeholder="Titre affiché en haut"
                      value={editForm.title}
                      onChange={handleEditChange}
                    />
                  </FormGroup>
                </SubCategoryInline>
                <SubCategoryInline>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Légende</FormLabel>
                    <FormField
                      name="legend"
                      placeholder="Texte sous le titre"
                      value={editForm.legend}
                      onChange={handleEditChange}
                    />
                  </FormGroup>
                </SubCategoryInline>
                <SubCategoryInline>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Disponibilité</FormLabel>
                    <FormSelect
                      name="availableAt"
                      value={editForm.availableAt}
                      onChange={handleEditChange}
                    >
                      <option value="always">Toujours</option>
                      <option value="midi">Midi</option>
                      <option value="soir">Soir</option>
                    </FormSelect>
                  </FormGroup>
                </SubCategoryInline>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <SubmitButton
                    type="button"
                    onClick={() => handleSaveEdit(cat)}
                    style={{ flex: 1 }}
                  >
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: 6 }} />
                    Enregistrer
                  </SubmitButton>
                  <SubmitButton
                    type="button"
                    onClick={handleCancelEdit}
                    style={{ flex: 0, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                  >
                    Annuler
                  </SubmitButton>
                </div>
              </div>
            </SubCategoryPanel>
          )}

          {/* Subcategories panel */}
          {expandedSlug === cat.slug && editingId !== cat._id && (
            <SubCategoryPanel>
              <SubCategoryArea>
                {cat.subCategory?.length === 0 && (
                  <span style={{ fontSize: "0.8rem", color: "#aaa" }}>
                    Aucune sous-catégorie
                  </span>
                )}
                {cat.subCategory?.map((sc) => (
                  <SubCategoryTag key={sc.slug}>
                    {sc.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubCategory(cat, sc.slug)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        lineHeight: 1,
                        color: "#999",
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                  </SubCategoryTag>
                ))}
              </SubCategoryArea>
              <SubCategoryInline>
                <FormField
                  placeholder="Nom"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  style={{ flex: 1, minWidth: "100px" }}
                />
                <FormField
                  placeholder="Slug"
                  value={newSubSlug}
                  onChange={(e) => setNewSubSlug(e.target.value)}
                  style={{ flex: 1, minWidth: "100px" }}
                />
                <SubmitButton
                  type="button"
                  onClick={() => handleAddSubCategory(cat)}
                  style={{ padding: "9px 14px", whiteSpace: "nowrap" }}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 6 }} />
                  Ajouter
                </SubmitButton>
              </SubCategoryInline>
            </SubCategoryPanel>
          )}
        </CategoryCard>
      ))}

      {!showForm ? (
        <AddButton type="button" onClick={() => setShowForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Ajouter une catégorie
        </AddButton>
      ) : (
        <AddCategoryForm onSubmit={handleAddCategory}>
          <FormGroup>
            <FormLabel>Nom *</FormLabel>
            <FormField
              name="name"
              placeholder="ex. Salades"
              value={form.name}
              onChange={handleFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Slug *</FormLabel>
            <FormField
              name="slug"
              placeholder="généré automatiquement"
              value={form.slug}
              onChange={handleFormChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Disponibilité</FormLabel>
            <FormSelect
              name="availableAt"
              value={form.availableAt}
              onChange={handleFormChange}
            >
              <option value="always">Toujours disponible</option>
              <option value="midi">Midi uniquement</option>
              <option value="soir">Soir uniquement</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Titre de page</FormLabel>
            <FormField
              name="title"
              placeholder="optionnel"
              value={form.title}
              onChange={handleFormChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Légende</FormLabel>
            <FormField
              name="legend"
              placeholder="optionnel"
              value={form.legend}
              onChange={handleFormChange}
            />
          </FormGroup>
          <div style={{ display: "flex", gap: "10px" }}>
            <SubmitButton type="submit" style={{ flex: 1 }}>
              Créer la catégorie
            </SubmitButton>
            <SubmitButton
              type="button"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              style={{ background: "#aaa" }}
            >
              Annuler
            </SubmitButton>
          </div>
        </AddCategoryForm>
      )}
    </AdminPanelContainer>
  );
};

export default CategoryAdmin;
