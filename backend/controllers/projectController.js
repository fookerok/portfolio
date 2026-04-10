const Project = require('../models/projectModels');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении проектов' });
  }
};

const addProject = async (req, res) => {
  const { name, descr, linkSite, linkGit, category_id } = req.body;

  try {
    const project = await Project.create({ name, descr, linkSite, linkGit, category_id });
    res.json(project);
  } catch(err) {
    console.error('Ошибка при добавлении проекта:', err.message);
    res.status(500).json({ error: err.message });
  }
}

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Project.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Проект не найден' });
    }
    res.json({ message: `Проект "${deleted.name}" удалён`, project: deleted });
  } catch (err) {
    console.error('Ошибка при удалении проекта:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const { name, descr, linkSite, linkGit, category_id } = req.body;

  try {
    const project = await Project.edit({ id, name, descr, linkSite, linkGit, category_id });
    res.json(project);
  } catch (err) {
    console.error('Ошибка редактирования проекта:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProjects,
  addProject,
  deleteProject,
  editProject,
};