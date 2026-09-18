const { useState, useEffect, useMemo } = React;

// API Base URL
const API_BASE = "";

// ==========================================
// SVG Icons Helper Components
// ==========================================
const Icon = ({ name, size = 18, className = "" }) => {
    const icons = {
        book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z M6 6h10 M6 10h10" />,
        users: <g><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></g>,
        layers: <g><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2 12.5" /><path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2 17.5" /></g>,
        dollar: <g><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></g>,
        plus: <g><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></g>,
        search: <g><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></g>,
        edit: <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />,
        trash: <g><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></g>,
        database: <g><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></g>,
        sun: <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41" /></g>,
        moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
        logIn: <g><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></g>,
        logOut: <g><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></g>,
        user: <g><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></g>,
        clock: <g><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></g>,
        check: <polyline points="20 6 9 17 4 12" />,
        x: <g><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></g>,
        alert: <g><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></g>,
        grid: <g><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></g>,
        list: <g><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></g>
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {icons[name] || icons.alert}
        </svg>
    );
};

// ==========================================
// Main Application Component
// ==========================================
function App() {
    // Theme State
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    // Nav State
    const [activeTab, setActiveTab] = useState("dashboard");

    // Data State
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serverOnline, setServerOnline] = useState(true);

    // Auth State
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    // Modals & Forms State
    const [authModal, setAuthModal] = useState({ open: false, mode: "login" });
    const [courseModal, setCourseModal] = useState({ open: false, mode: "create", data: null });
    const [studentModal, setStudentModal] = useState({ open: false, mode: "create", data: null });
    const [bulkStudentModal, setBulkStudentModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ open: false, type: "", id: null, name: "" });

    // Filter & Search State
    const [courseSearch, setCourseSearch] = useState("");
    const [courseDeptFilter, setCourseDeptFilter] = useState("all");
    const [courseView, setCourseView] = useState("grid"); // grid or table

    const [studentSearch, setStudentSearch] = useState("");
    const [studentDeptFilter, setStudentDeptFilter] = useState("all");
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Toast Notifications State
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = "info") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    // Toggle Theme
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    // Initial Data Fetch
    useEffect(() => {
        fetchCourses();
        fetchStudents();
    }, []);

    // API Calls
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/course`);
            if (res.ok) {
                const data = await res.json();
                setCourses(data);
                setServerOnline(true);
            } else {
                setServerOnline(false);
            }
        } catch (err) {
            setServerOnline(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await fetch(`${API_BASE}/student`);
            if (res.ok) {
                const data = await res.json();
                setStudents(data);
                setServerOnline(true);
            }
        } catch (err) {
            setServerOnline(false);
        }
    };

    // Derived Statistics
    const departments = useMemo(() => {
        const set = new Set();
        courses.forEach(c => c.department && set.add(c.department));
        students.forEach(s => s.department && set.add(s.department));
        return Array.from(set);
    }, [courses, students]);

    const totalFees = useMemo(() => {
        return courses.reduce((sum, c) => sum + (c.fees || 0), 0);
    }, [courses]);

    // Filtered Lists
    const filteredCourses = useMemo(() => {
        return courses.filter(c => {
            const matchesSearch = (c.name || "").toLowerCase().includes(courseSearch.toLowerCase()) ||
                (c.department || "").toLowerCase().includes(courseSearch.toLowerCase());
            const matchesDept = courseDeptFilter === "all" || c.department === courseDeptFilter;
            return matchesSearch && matchesDept;
        });
    }, [courses, courseSearch, courseDeptFilter]);

    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchesSearch = (s.name || "").toLowerCase().includes(studentSearch.toLowerCase()) ||
                (s.username || "").toLowerCase().includes(studentSearch.toLowerCase()) ||
                (s.department || "").toLowerCase().includes(studentSearch.toLowerCase());
            const matchesDept = studentDeptFilter === "all" || s.department === studentDeptFilter;
            return matchesSearch && matchesDept;
        });
    }, [students, studentSearch, studentDeptFilter]);

    // Handle Authentication
    const handleAuthSubmit = async (e, formData, mode) => {
        e.preventDefault();
        try {
            if (mode === "register") {
                const res = await fetch(`${API_BASE}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
                const msg = await res.text();
                if (res.ok || res.status === 201) {
                    addToast("Registration Successful! You can now log in.", "success");
                    setAuthModal({ open: true, mode: "login" });
                } else {
                    addToast(msg || "Registration failed", "error");
                }
            } else {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                });
                if (res.ok) {
                    const data = await res.json();
                    setCurrentUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                    addToast(`Welcome back, ${data.name || data.message}!`, "success");
                    setAuthModal({ open: false, mode: "login" });
                } else {
                    const err = await res.text();
                    addToast(err || "Invalid credentials", "error");
                }
            }
        } catch (err) {
            addToast("Network error during authentication", "error");
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
        addToast("Logged out successfully", "info");
    };

    // Handle Course Save
    const handleSaveCourse = async (courseData) => {
        try {
            const isEdit = courseModal.mode === "edit";
            const url = isEdit ? `${API_BASE}/course/${courseData.id}` : `${API_BASE}/course`;
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseName: courseData.courseName || courseData.name,
                    department: courseData.department,
                    duration: Number(courseData.duration) || 0,
                    fees: Number(courseData.fees) || 0,
                    username: courseData.username || `course_${Date.now()}`,
                    password: courseData.password || "pass123"
                })
            });

            if (res.ok) {
                addToast(isEdit ? "Course updated successfully" : "Course created successfully", "success");
                setCourseModal({ open: false, mode: "create", data: null });
                fetchCourses();
            } else {
                addToast("Failed to save course", "error");
            }
        } catch (err) {
            addToast("Error communicating with server", "error");
        }
    };

    // Handle Student Save
    const handleSaveStudent = async (studentData) => {
        try {
            const isEdit = studentModal.mode === "edit";
            const url = isEdit ? `${API_BASE}/student/${studentData.id}` : `${API_BASE}/student`;
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: studentData.id,
                    name: studentData.name,
                    department: studentData.department,
                    username: studentData.username,
                    password: studentData.password
                })
            });

            if (res.ok) {
                addToast(isEdit ? "Student updated successfully" : "Student registered successfully", "success");
                setStudentModal({ open: false, mode: "create", data: null });
                fetchStudents();
            } else {
                addToast("Failed to save student", "error");
            }
        } catch (err) {
            addToast("Error saving student record", "error");
        }
    };

    // Bulk Add Students
    const handleBulkAddStudents = async (studentsList) => {
        try {
            const res = await fetch(`${API_BASE}/student/bulk`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentsList)
            });

            if (res.ok) {
                addToast(`Successfully added ${studentsList.length} students!`, "success");
                setBulkStudentModal(false);
                fetchStudents();
            } else {
                addToast("Bulk addition failed", "error");
            }
        } catch (err) {
            addToast("Error submitting bulk records", "error");
        }
    };

    // Delete Operations
    const confirmDelete = async () => {
        try {
            const { type, id } = deleteModal;
            if (type === "course") {
                const res = await fetch(`${API_BASE}/course/${id}`, { method: "DELETE" });
                if (res.ok) {
                    addToast("Course deleted successfully", "success");
                    fetchCourses();
                } else {
                    addToast("Failed to delete course", "error");
                }
            } else if (type === "student") {
                const res = await fetch(`${API_BASE}/student/${id}`, { method: "DELETE" });
                if (res.ok) {
                    addToast("Student deleted successfully", "success");
                    fetchStudents();
                } else {
                    addToast("Failed to delete student", "error");
                }
            } else if (type === "student-bulk") {
                const res = await fetch(`${API_BASE}/student/bulk`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(selectedStudents)
                });
                if (res.ok) {
                    addToast(`Deleted ${selectedStudents.length} students`, "success");
                    setSelectedStudents([]);
                    fetchStudents();
                } else {
                    addToast("Failed to delete selected students", "error");
                }
            }
        } catch (err) {
            addToast("Delete operation failed", "error");
        } finally {
            setDeleteModal({ open: false, type: "", id: null, name: "" });
        }
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="app-header">
                <div className="brand-section">
                    <div className="brand-logo">
                        <Icon name="layers" size={24} />
                    </div>
                    <div className="brand-info">
                        <h1>EduPortal</h1>
                        <span>Spring Boot & React</span>
                    </div>
                </div>

                <nav className="nav-tabs">
                    <button
                        id="nav-dashboard"
                        className={`nav-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <Icon name="grid" size={16} /> Dashboard
                    </button>
                    <button
                        id="nav-courses"
                        className={`nav-tab-btn ${activeTab === "courses" ? "active" : ""}`}
                        onClick={() => setActiveTab("courses")}
                    >
                        <Icon name="book" size={16} /> Courses ({courses.length})
                    </button>
                    <button
                        id="nav-students"
                        className={`nav-tab-btn ${activeTab === "students" ? "active" : ""}`}
                        onClick={() => setActiveTab("students")}
                    >
                        <Icon name="users" size={16} /> Students ({students.length})
                    </button>
                </nav>

                <div className="header-actions">
                    <div className={`status-pill ${serverOnline ? "" : "error"}`}>
                        <span className="status-dot"></span>
                        {serverOnline ? "Backend Live (Port 8000)" : "Backend Offline"}
                    </div>

                    <a
                        href="/h2-console"
                        target="_blank"
                        rel="noreferrer"
                        className="icon-btn"
                        title="Open H2 Database Console"
                    >
                        <Icon name="database" size={18} />
                    </a>

                    <button
                        id="theme-toggle"
                        className="icon-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                    >
                        <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
                    </button>

                    {currentUser ? (
                        <div className="user-badge">
                            <div className="user-avatar">
                                {(currentUser.name || "U")[0].toUpperCase()}
                            </div>
                            <span>{currentUser.name}</span>
                            <button
                                id="btn-logout"
                                onClick={handleLogout}
                                className="icon-btn"
                                style={{ width: 28, height: 28, border: "none", background: "transparent" }}
                                title="Log Out"
                            >
                                <Icon name="logOut" size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            id="btn-login-open"
                            className="btn btn-primary btn-sm"
                            onClick={() => setAuthModal({ open: true, mode: "login" })}
                        >
                            <Icon name="logIn" size={15} /> Login / Register
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main>
                {activeTab === "dashboard" && (
                    <DashboardView
                        courses={courses}
                        students={students}
                        departments={departments}
                        totalFees={totalFees}
                        setActiveTab={setActiveTab}
                        setCourseModal={setCourseModal}
                        setStudentModal={setStudentModal}
                    />
                )}

                {activeTab === "courses" && (
                    <CoursesView
                        courses={filteredCourses}
                        departments={departments}
                        search={courseSearch}
                        setSearch={setCourseSearch}
                        deptFilter={courseDeptFilter}
                        setDeptFilter={setCourseDeptFilter}
                        view={courseView}
                        setView={setCourseView}
                        onAdd={() => setCourseModal({ open: true, mode: "create", data: null })}
                        onEdit={(course) => setCourseModal({ open: true, mode: "edit", data: course })}
                        onDelete={(course) => setDeleteModal({ open: true, type: "course", id: course.id, name: course.name })}
                    />
                )}

                {activeTab === "students" && (
                    <StudentsView
                        students={filteredStudents}
                        departments={departments}
                        search={studentSearch}
                        setSearch={setStudentSearch}
                        deptFilter={studentDeptFilter}
                        setDeptFilter={setStudentDeptFilter}
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                        onAdd={() => setStudentModal({ open: true, mode: "create", data: null })}
                        onBulkAdd={() => setBulkStudentModal(true)}
                        onEdit={(student) => setStudentModal({ open: true, mode: "edit", data: student })}
                        onDelete={(student) => setDeleteModal({ open: true, type: "student", id: student.id, name: student.name })}
                        onBulkDelete={() => setDeleteModal({
                            open: true,
                            type: "student-bulk",
                            id: null,
                            name: `${selectedStudents.length} selected students`
                        })}
                    />
                )}
            </main>

            {/* Modals */}
            {authModal.open && (
                <AuthModal
                    mode={authModal.mode}
                    setMode={(m) => setAuthModal(prev => ({ ...prev, mode: m }))}
                    onClose={() => setAuthModal({ open: false, mode: "login" })}
                    onSubmit={handleAuthSubmit}
                />
            )}

            {courseModal.open && (
                <CourseModal
                    mode={courseModal.mode}
                    initialData={courseModal.data}
                    onClose={() => setCourseModal({ open: false, mode: "create", data: null })}
                    onSave={handleSaveCourse}
                />
            )}

            {studentModal.open && (
                <StudentModal
                    mode={studentModal.mode}
                    initialData={studentModal.data}
                    onClose={() => setStudentModal({ open: false, mode: "create", data: null })}
                    onSave={handleSaveStudent}
                />
            )}

            {bulkStudentModal && (
                <BulkStudentModal
                    onClose={() => setBulkStudentModal(false)}
                    onSave={handleBulkAddStudents}
                />
            )}

            {deleteModal.open && (
                <ConfirmDeleteModal
                    title="Confirm Deletion"
                    itemName={deleteModal.name}
                    onConfirm={confirmDelete}
                    onClose={() => setDeleteModal({ open: false, type: "", id: null, name: "" })}
                />
            )}

            {/* Toast Notifications */}
            <div className="toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`toast ${t.type}`}>
                        <Icon name={t.type === "success" ? "check" : t.type === "error" ? "alert" : "layers"} size={18} />
                        <span>{t.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// Dashboard View
// ==========================================
function DashboardView({ courses, students, departments, totalFees, setActiveTab, setCourseModal, setStudentModal }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Quick Banner */}
            <div className="quick-banner">
                <div className="quick-banner-text">
                    <h3>Academic Operations Dashboard</h3>
                    <p>Manage curriculum, enrolled students, faculty departments, and live Spring Boot database records seamlessly.</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button
                        id="quick-add-course"
                        className="btn btn-primary"
                        onClick={() => setCourseModal({ open: true, mode: "create", data: null })}
                    >
                        <Icon name="plus" size={16} /> New Course
                    </button>
                    <button
                        id="quick-add-student"
                        className="btn btn-secondary"
                        onClick={() => setStudentModal({ open: true, mode: "create", data: null })}
                    >
                        <Icon name="plus" size={16} /> Register Student
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="metrics-grid">
                <div className="metric-card" onClick={() => setActiveTab("courses")} style={{ cursor: "pointer" }}>
                    <div className="metric-icon-wrap indigo">
                        <Icon name="book" size={26} />
                    </div>
                    <div className="metric-info">
                        <span className="metric-label">Total Courses</span>
                        <span className="metric-value">{courses.length}</span>
                    </div>
                </div>

                <div className="metric-card" onClick={() => setActiveTab("students")} style={{ cursor: "pointer" }}>
                    <div className="metric-icon-wrap pink">
                        <Icon name="users" size={26} />
                    </div>
                    <div className="metric-info">
                        <span className="metric-label">Enrolled Students</span>
                        <span className="metric-value">{students.length}</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon-wrap cyan">
                        <Icon name="layers" size={26} />
                    </div>
                    <div className="metric-info">
                        <span className="metric-label">Departments</span>
                        <span className="metric-value">{departments.length}</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon-wrap emerald">
                        <Icon name="dollar" size={26} />
                    </div>
                    <div className="metric-info">
                        <span className="metric-label">Course Valuation</span>
                        <span className="metric-value">${totalFees.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Recent Courses Preview */}
            <div style={{ marginTop: 8 }}>
                <div className="section-header-row">
                    <div>
                        <h2 className="section-title">Popular Courses</h2>
                        <p className="section-subtitle">Recently registered academic programs</p>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("courses")}>
                        View All ({courses.length})
                    </button>
                </div>

                {courses.length === 0 ? (
                    <div className="table-container empty-state">
                        <Icon name="book" size={42} />
                        <h3>No Courses Found</h3>
                        <p>Get started by creating your first course in the portal.</p>
                        <button className="btn btn-primary btn-sm" onClick={() => setCourseModal({ open: true, mode: "create", data: null })}>
                            Create Course
                        </button>
                    </div>
                ) : (
                    <div className="card-grid">
                        {courses.slice(0, 3).map(c => (
                            <div key={c.id} className="content-card">
                                <div>
                                    <div className="card-top">
                                        <span className="badge badge-indigo">{c.department || "General"}</span>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ID: #{c.id}</span>
                                    </div>
                                    <h3 className="card-title">{c.name || c.courseName}</h3>
                                    <div className="card-detail-row">
                                        <div className="card-detail-item">
                                            <Icon name="clock" size={15} />
                                            <span>{c.duration ? `${c.duration} Months` : "Flexible"}</span>
                                        </div>
                                    </div>
                                    <div className="card-fees-tag">
                                        {c.fees ? `$${c.fees.toLocaleString()}` : "Free"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ==========================================
// Courses View
// ==========================================
function CoursesView({ courses, departments, search, setSearch, deptFilter, setDeptFilter, view, setView, onAdd, onEdit, onDelete }) {
    return (
        <div>
            <div className="section-header-row">
                <div>
                    <h2 className="section-title">Courses Management</h2>
                    <p className="section-subtitle">Browse, create, update and configure department curriculum</p>
                </div>
                <div className="controls-cluster">
                    <button id="btn-add-course" className="btn btn-primary" onClick={onAdd}>
                        <Icon name="plus" size={16} /> Add Course
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="section-header-row" style={{ marginBottom: 20 }}>
                <div className="controls-cluster">
                    <div className="search-input-wrap">
                        <Icon name="search" size={16} />
                        <input
                            type="text"
                            placeholder="Search courses or departments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <select
                        className="select-filter"
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                    >
                        <option value="all">All Departments ({departments.length})</option>
                        {departments.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        className={`icon-btn ${view === "grid" ? "active" : ""}`}
                        onClick={() => setView("grid")}
                        title="Grid Card View"
                    >
                        <Icon name="grid" size={16} />
                    </button>
                    <button
                        className={`icon-btn ${view === "table" ? "active" : ""}`}
                        onClick={() => setView("table")}
                        title="Table View"
                    >
                        <Icon name="list" size={16} />
                    </button>
                </div>
            </div>

            {/* Course Content */}
            {courses.length === 0 ? (
                <div className="table-container empty-state">
                    <Icon name="book" size={48} />
                    <h3>No matching courses found</h3>
                    <p>Try adjusting your search criteria or add a new course.</p>
                </div>
            ) : view === "grid" ? (
                <div className="card-grid">
                    {courses.map(c => (
                        <div key={c.id} className="content-card">
                            <div>
                                <div className="card-top">
                                    <span className="badge badge-indigo">{c.department || "General"}</span>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ID: #{c.id}</span>
                                </div>
                                <h3 className="card-title">{c.name || c.courseName}</h3>
                                <div className="card-detail-row">
                                    <div className="card-detail-item">
                                        <Icon name="clock" size={15} />
                                        <span>{c.duration ? `${c.duration} Months` : "Flexible Duration"}</span>
                                    </div>
                                    <div className="card-detail-item">
                                        <Icon name="user" size={15} />
                                        <span>{c.username || "student"}</span>
                                    </div>
                                </div>
                                <div className="card-fees-tag">
                                    {c.fees ? `$${c.fees.toLocaleString()}` : "Free"}
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => onEdit(c)}>
                                    <Icon name="edit" size={14} /> Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(c)}>
                                    <Icon name="trash" size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course Title</th>
                                <th>Department</th>
                                <th>Duration</th>
                                <th>Fees</th>
                                <th>Default Username</th>
                                <th style={{ textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600 }}>#{c.id}</td>
                                    <td style={{ fontWeight: 600 }}>{c.name || c.courseName}</td>
                                    <td><span className="badge badge-indigo">{c.department || "General"}</span></td>
                                    <td>{c.duration ? `${c.duration} mo` : "—"}</td>
                                    <td style={{ fontWeight: 700, color: "var(--accent-emerald)" }}>
                                        {c.fees ? `$${c.fees.toLocaleString()}` : "Free"}
                                    </td>
                                    <td style={{ color: "var(--text-muted)" }}>{c.username}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <div style={{ display: "inline-flex", gap: 8 }}>
                                            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(c)}>
                                                <Icon name="edit" size={13} />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => onDelete(c)}>
                                                <Icon name="trash" size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// ==========================================
// Students View
// ==========================================
function StudentsView({ students, departments, search, setSearch, deptFilter, setDeptFilter, selectedStudents, setSelectedStudents, onAdd, onBulkAdd, onEdit, onDelete, onBulkDelete }) {
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(students.map(s => s.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const isAllSelected = students.length > 0 && selectedStudents.length === students.length;

    return (
        <div>
            <div className="section-header-row">
                <div>
                    <h2 className="section-title">Students Directory</h2>
                    <p className="section-subtitle">Manage student enrollment, bulk import, and profile data</p>
                </div>
                <div className="controls-cluster">
                    {selectedStudents.length > 0 && (
                        <button id="btn-bulk-delete" className="btn btn-danger" onClick={onBulkDelete}>
                            <Icon name="trash" size={16} /> Delete Selected ({selectedStudents.length})
                        </button>
                    )}
                    <button id="btn-bulk-add-student" className="btn btn-secondary" onClick={onBulkAdd}>
                        <Icon name="layers" size={16} /> Bulk Add
                    </button>
                    <button id="btn-add-student" className="btn btn-primary" onClick={onAdd}>
                        <Icon name="plus" size={16} /> Add Student
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="section-header-row" style={{ marginBottom: 20 }}>
                <div className="controls-cluster">
                    <div className="search-input-wrap">
                        <Icon name="search" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, username or dept..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <select
                        className="select-filter"
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                    >
                        <option value="all">All Departments ({departments.length})</option>
                        {departments.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Students Table */}
            {students.length === 0 ? (
                <div className="table-container empty-state">
                    <Icon name="users" size={48} />
                    <h3>No students found</h3>
                    <p>Add students individually or use the Bulk Add feature to import multiple entries.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: 44, textAlign: "center" }}>
                                    <input
                                        type="checkbox"
                                        className="table-checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>ID</th>
                                <th>Student Name</th>
                                <th>Department</th>
                                <th>Username</th>
                                <th>Default Password</th>
                                <th style={{ textAlign: "right" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.id}>
                                    <td style={{ textAlign: "center" }}>
                                        <input
                                            type="checkbox"
                                            className="table-checkbox"
                                            checked={selectedStudents.includes(s.id)}
                                            onChange={() => handleSelectOne(s.id)}
                                        />
                                    </td>
                                    <td style={{ fontWeight: 600 }}>#{s.id}</td>
                                    <td style={{ fontWeight: 600 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div className="user-avatar" style={{ width: 28, height: 28, fontSize: "0.75rem" }}>
                                                {(s.name || "S")[0].toUpperCase()}
                                            </div>
                                            {s.name}
                                        </div>
                                    </td>
                                    <td><span className="badge badge-cyan">{s.department || "General"}</span></td>
                                    <td style={{ color: "var(--text-secondary)" }}>{s.username}</td>
                                    <td style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>••••••••</td>
                                    <td style={{ textAlign: "right" }}>
                                        <div style={{ display: "inline-flex", gap: 8 }}>
                                            <button className="btn btn-secondary btn-sm" onClick={() => onEdit(s)}>
                                                <Icon name="edit" size={13} /> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => onDelete(s)}>
                                                <Icon name="trash" size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// ==========================================
// Modals
// ==========================================

// Auth Modal
function AuthModal({ mode, setMode, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        username: "",
        password: ""
    });

    const isRegister = mode === "register";

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{isRegister ? "Create User Account" : "User Login"}</h3>
                    <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
                        <Icon name="x" size={16} />
                    </button>
                </div>
                <form onSubmit={e => onSubmit(e, formData, mode)}>
                    <div className="modal-body">
                        {isRegister && (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-input"
                                        placeholder="e.g. John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-input"
                                        placeholder="e.g. Computer Science"
                                        value={formData.department}
                                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                required
                                className="form-input"
                                placeholder="Username"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                required
                                className="form-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                            {isRegister ? "Already registered?" : "Don't have an account?"}{" "}
                            <span
                                style={{ color: "var(--accent-primary)", cursor: "pointer", fontWeight: 600 }}
                                onClick={() => setMode(isRegister ? "login" : "register")}
                            >
                                {isRegister ? "Sign In" : "Register Now"}
                            </span>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {isRegister ? "Register" : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Course Modal
function CourseModal({ mode, initialData, onClose, onSave }) {
    const [formData, setFormData] = useState({
        id: initialData ? initialData.id : null,
        name: initialData ? (initialData.name || initialData.courseName) : "",
        department: initialData ? initialData.department : "",
        duration: initialData ? initialData.duration : 6,
        fees: initialData ? initialData.fees : 15000,
        username: initialData ? initialData.username : "",
        password: initialData ? initialData.password : "default123"
    });

    const isEdit = mode === "edit";

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{isEdit ? "Edit Course" : "Add New Course"}</h3>
                    <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
                        <Icon name="x" size={16} />
                    </button>
                </div>
                <form onSubmit={e => { e.preventDefault(); onSave(formData); }}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Course Title</label>
                            <input
                                type="text"
                                required
                                className="form-input"
                                placeholder="e.g. Advanced Java & Spring Boot"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <input
                                type="text"
                                required
                                className="form-input"
                                placeholder="e.g. Computer Science"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Duration (Months)</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="form-input"
                                    value={formData.duration}
                                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Tuition Fees ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="form-input"
                                    value={formData.fees}
                                    onChange={e => setFormData({ ...formData, fees: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{isEdit ? "Save Changes" : "Create Course"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Student Modal
function StudentModal({ mode, initialData, onClose, onSave }) {
    const [formData, setFormData] = useState({
        id: initialData ? initialData.id : null,
        name: initialData ? initialData.name : "",
        department: initialData ? initialData.department : "",
        username: initialData ? initialData.username : "",
        password: initialData ? initialData.password : "default123"
    });

    const isEdit = mode === "edit";

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{isEdit ? "Edit Student Details" : "Register Student"}</h3>
                    <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
                        <Icon name="x" size={16} />
                    </button>
                </div>
                <form onSubmit={e => { e.preventDefault(); onSave(formData); }}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Student Name</label>
                            <input
                                type="text"
                                required
                                className="form-input"
                                placeholder="e.g. Alice Smith"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <input
                                type="text"
                                required
                                className="form-input"
                                placeholder="e.g. Information Technology"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                        {!isEdit && (
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-input"
                                        placeholder="e.g. alicesmith"
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Initial Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="form-input"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{isEdit ? "Update Student" : "Register"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Bulk Student Modal
function BulkStudentModal({ onClose, onSave }) {
    const [jsonInput, setJsonInput] = useState(`[
  {
    "name": "Sarah Connor",
    "department": "CSE",
    "username": "sarahc",
    "password": "pass123"
  },
  {
    "name": "David Miller",
    "department": "ECE",
    "username": "davidm",
    "password": "pass123"
  }
]`);
    const [parseError, setParseError] = useState("");

    const handleBatchSubmit = (e) => {
        e.preventDefault();
        try {
            const parsed = JSON.parse(jsonInput);
            if (!Array.isArray(parsed)) {
                setParseError("JSON must be an array of student objects.");
                return;
            }
            onSave(parsed);
        } catch (err) {
            setParseError("Invalid JSON format. Please verify syntax.");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" style={{ maxWidth: 620 }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Bulk Student Import</h3>
                    <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
                        <Icon name="x" size={16} />
                    </button>
                </div>
                <form onSubmit={handleBatchSubmit}>
                    <div className="modal-body">
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                            Paste a JSON array of student objects with <code>name</code>, <code>department</code>, <code>username</code>, and <code>password</code>.
                        </p>
                        <div className="form-group">
                            <textarea
                                rows="8"
                                className="form-textarea"
                                value={jsonInput}
                                onChange={e => { setJsonInput(e.target.value); setParseError(""); }}
                                style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                            />
                        </div>
                        {parseError && (
                            <div style={{ color: "var(--accent-rose)", fontSize: "0.85rem" }}>
                                {parseError}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Import Students</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Confirm Delete Modal
function ConfirmDeleteModal({ title, itemName, onConfirm, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
                        <Icon name="x" size={16} />
                    </button>
                </div>
                <div className="modal-body">
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                        Are you sure you want to delete <strong style={{ color: "var(--text-primary)" }}>{itemName}</strong>? This action cannot be undone.
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>Confirm Delete</button>
                </div>
            </div>
        </div>
    );
}

// Mount the React Application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
