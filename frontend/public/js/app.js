document.addEventListener("DOMContentLoaded", function () {
    // Helper function to show loading feedback
    function showLoadingFeedback(form, button) {
        const loadingText = document.createElement('span');
        loadingText.textContent = "Processing...";
        button.disabled = true;
        form.appendChild(loadingText);
    }

    // Helper function to remove loading feedback
    function removeLoadingFeedback(form, button) {
        button.disabled = false;
        const loadingText = form.querySelector('span');
        if (loadingText) form.removeChild(loadingText);
    }

    // Validate email format (simple check for @ symbol)
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Validate password: minimum length of 7, must contain numbers, letters, and special characters
    function validatePassword(password) {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        return passwordPattern.test(password);
    }

    // Toggle password visibility
    function togglePasswordVisibility(passwordField, icon) {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            icon.classList.add("visible");
        } else {
            passwordField.type = "password";
            icon.classList.remove("visible");
        }
    }

    // Handle Login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;

            // Validate email, password, and role
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (password.length < 7) {
                alert("Password must be at least 7 characters.");
                return;
            }

            if (!role || role === "Choose Your Role") {
                alert("Please select a valid role.");
                return;
            }

            showLoadingFeedback(loginForm, loginForm.querySelector("button"));

            // Send login request (replace with your server's API endpoint)
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, role }),
            })
                .then((response) => response.json())
                .then((data) => {
                    removeLoadingFeedback(loginForm, loginForm.querySelector("button"));
                    if (data.success) {
                        window.location.href = "/dashboard"; // Redirect to dashboard
                    } else {
                        alert(data.message || "Login failed.");
                    }
                })
                .catch((error) => {
                    removeLoadingFeedback(loginForm, loginForm.querySelector("button"));
                    alert("Error: " + error.message);
                });
        });
    }

    // Handle Forgot Password link
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function () {
            window.location.href = "/forgot-password"; // Redirect to forgot password page
        });
    }

    // Handle Forgot Password form submission
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("forgotPasswordEmail").value;
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            showLoadingFeedback(forgotPasswordForm, forgotPasswordForm.querySelector("button"));

            // Send forgot password request
            fetch("/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    removeLoadingFeedback(forgotPasswordForm, forgotPasswordForm.querySelector("button"));
                    alert(data.message || "Password reset email sent.");
                    window.location.href = "/login"; // Redirect to login page
                })
                .catch((error) => {
                    removeLoadingFeedback(forgotPasswordForm, forgotPasswordForm.querySelector("button"));
                    alert("Error: " + error.message);
                });
        });
    }

    // Handle Signup form submission
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            // Validate email and password
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be at least 7 characters, and include letters, numbers, and special characters.");
                return;
            }

            showLoadingFeedback(signupForm, signupForm.querySelector("button"));

            // Send signup request
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    removeLoadingFeedback(signupForm, signupForm.querySelector("button"));
                    if (data.success) {
                        window.location.href = "/login"; // Redirect to login page
                    } else {
                        alert(data.message || "Signup failed.");
                    }
                })
                .catch((error) => {
                    removeLoadingFeedback(signupForm, signupForm.querySelector("button"));
                    alert("Error: " + error.message);
                });
        });
    }

    // Toggle Password Visibility (for both Login and Signup pages)
    const passwordFields = document.querySelectorAll(".passwordField");
    passwordFields.forEach((field) => {
        const icon = field.nextElementSibling;
        icon.addEventListener("click", function () {
            togglePasswordVisibility(field, icon);
        });
    });

    // Handle Logout (for all dashboards)
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            fetch("/logout", {
                method: "POST",
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        window.location.href = "/login"; // Redirect to login page after logout
                    } else {
                        alert(data.message || "Logout failed.");
                    }
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }

    // Handle Dashboard Quick Stats (Dynamically fetch stats data)
    const quickStatsSection = document.getElementById("quickStatsSection");
    if (quickStatsSection) {
        // Mock API call to fetch dynamic stats data (Replace with real server-side logic)
        fetch("/api/stats")
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("activeCourses").innerText = data.activeCourses;
                document.getElementById("totalStudents").innerText = data.totalStudents;
                document.getElementById("pendingAssignments").innerText = data.pendingAssignments;
                document.getElementById("upcomingDeadlines").innerText = data.upcomingDeadlines;
            })
            .catch((error) => {
                alert("Error fetching stats: " + error.message);
            });
    }

    // Add tooltips for interactive dashboard elements
    const tooltips = document.querySelectorAll("[data-tooltip]");
    tooltips.forEach((element) => {
        element.addEventListener("mouseover", function () {
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.textContent = element.getAttribute("data-tooltip");
            document.body.appendChild(tooltip);
            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight - 5 + "px";
            tooltip.style.left = rect.left + window.scrollX + (element.offsetWidth / 2) - (tooltip.offsetWidth / 2) + "px";
        });

        element.addEventListener("mouseout", function () {
            const tooltip = document.querySelector(".tooltip");
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});
