import { Octokit } from "@octokit/core";
import {notFoundTemplate, searchTemplate, userTemplate, repoTemplate, skeleton} from "./templates.js";

document.addEventListener('DOMContentLoaded', function () {
    const octokit = new Octokit({ auth: "you_github_token_here"});
    const searchInput = document.getElementById("search");
    const searchResults = document.getElementById("searchResults");
    const themeSwitcher = document.getElementById("switch");
    const userResults = document.getElementById("userResults");
    const body = document.querySelector('body');
    let prevUserResults = [];
    let searchTimeout;

    // Theme
    const switchTheme = (arg) => {
        body.classList[ arg ? 'remove' : 'add']("dark");
        body.classList[ arg ? 'add' : 'remove']("light");
    }
    themeSwitcher.addEventListener('change', function() {switchTheme(this.checked)});
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeSwitcher.checked = !prefersDark; 
    switchTheme(!prefersDark);

    // User Data
    const fetchUserData = async (username) => {
        try {
            const response = await octokit.request('GET /users/{username}', {
                username: username
            });
            const data = response.data;

            // Fetch user repositories
            const repoResponse = await octokit.request('GET /users/{username}/repos', {
                username: username
            });
            const repoData = repoResponse.data;

            // Display Results
            const repoHTML = repoData.map(repo => repoTemplate(repo)).join('');
            userResults.innerHTML = userTemplate(data);
            document.getElementById("repoResults").innerHTML = repoHTML;
            document.getElementById("repoResults").classList.add('border-bt');
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    const showResults = (show = true) =>  searchResults.classList[show ? 'add' : 'remove']("show");

    // User Events
    searchInput.addEventListener('input', async function() {
        clearTimeout(searchTimeout);

        // Get User Input
        const search = this.value.trim();
        if (search === "") {
            showResults(false);
            searchResults.innerHTML = ""; 
            return;
        }

        // Make Request
        searchTimeout = setTimeout( async () => {
            try {
                const response = await octokit.request('GET /search/users', {
                    q: search
                });
                
                const users = response.data.items;
                prevUserResults = users;

                if (users.length > 0) {
                    const dropdownHTML = users.map(user => searchTemplate(user)).join('');
                    searchResults.innerHTML = dropdownHTML;
                    showResults();
                } else {
                    searchResults.innerHTML = notFoundTemplate('No users found');
                    showResults();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 600)

    });

    searchResults.addEventListener('click', function(event) {
        showResults(false);
        const target = event.target;
        
        if (target.classList.contains('list-group-item')) {
            const username = target.getAttribute('data-username');
            userResults.innerHTML = skeleton();
            fetchUserData(username);
        }
    });

    // Show Previous Search Results
    document.addEventListener( "click", (event) => {
        const target = event.target;
        const isSearch = target.classList.contains('form-control');
        
        if (isSearch && prevUserResults.length) showResults();
        else showResults(false);
    }); 
});