// 本地存储服务 - 替代后端数据库

// 类型定义
export interface Project {
  id: string;
  uuid: string;  // 别名，兼容旧代码
  name: string;
  description: string;
  prompt: string;
  status: string;
  files: ProjectFile[];
  conversations: Conversation[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFile {
  id: number;
  path: string;
  content: string;
  type: string;
}

export interface Conversation {
  role: string;
  content: string;
  agentName?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  createdAt: string;
}

// 存储键
const STORAGE_KEYS = {
  USER: 'atoms_user',
  PROJECTS: 'atoms_projects',
  CURRENT_PROJECT: 'atoms_current_project',
};

// 生成 UUID
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============ 用户相关 ============

export function getUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export function setUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function createUser(email: string, name: string): User {
  const user: User = {
    id: generateId(),
    email,
    name,
    credits: 100,
    createdAt: new Date().toISOString(),
  };
  setUser(user);
  return user;
}

// 简化的登录（本地模式）
export function loginUser(email: string): User {
  let user = getUser();
  if (!user || user.email !== email) {
    user = createUser(email, email.split('@')[0]);
  }
  return user;
}

// ============ 项目相关 ============

export function getProjects(): Project[] {
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return data ? JSON.parse(data) : [];
}

function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
}

export function createProject(name: string, description: string, prompt: string): Project {
  const projects = getProjects();
  const id = generateId();
  const project: Project = {
    id,
    uuid: id,  // 兼容旧代码
    name: name || '新项目',
    description: description || '',
    prompt: prompt || '',
    status: 'created',
    files: [],
    conversations: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(project);
  saveProjects(projects);
  return project;
}

export function getProject(id: string): Project | null {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

// ============ 项目文件相关 ============

export function updateProjectFiles(projectId: string, files: Array<{ path: string; content: string; type: string }>): Project | null {
  const project = getProject(projectId);
  if (!project) return null;
  
  const projectFiles: ProjectFile[] = files.map((f, idx) => ({
    id: idx,
    path: f.path,
    content: f.content,
    type: f.type,
  }));
  
  return updateProject(projectId, { files: projectFiles, status: 'generated' });
}

// ============ 对话相关 ============

export function addConversation(projectId: string, role: string, content: string, agentName?: string): Project | null {
  const project = getProject(projectId);
  if (!project) return null;
  
  const conversation: Conversation = {
    role,
    content,
    agentName,
    createdAt: new Date().toISOString(),
  };
  
  const conversations = [...project.conversations, conversation];
  return updateProject(projectId, { conversations });
}

// ============ 导出所有数据（用于备份） ============

export function exportAllData(): string {
  return JSON.stringify({
    user: getUser(),
    projects: getProjects(),
  }, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.user) setUser(data.user);
    if (data.projects) saveProjects(data.projects);
    return true;
  } catch {
    return false;
  }
}
