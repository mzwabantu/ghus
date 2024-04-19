export function searchTemplate(user){
    return (`
        <li class="list-group-item" data-username="${user.login}">
            <img alt="" src="${user.avatar_url}" width="40" height="40" class="img-thumbnail rounded-circle me-2" />
            <span>${user.login}</span>
        </li>
    `);
}

export function notFoundTemplate(message) {
    return `<li class="list-group-item disabled">${message}</li>`;
}

export function userTemplate(user) {
    return (`
    <div class="card shadow rounded-3 border-0 mx-auto">
        <div class="card-body">
            <div class="profile-img d-flex align-items-center">
                <img alt="" src="${user.avatar_url}" width="200" height="200" class="img-thumbnail rounded-circle" />
                <div class="ms-3 ms-md-4">
                    <h2 class="fs-4 mb-1">
                        <a href="${user.html_url}" target="_blank">${user.name ?? ''}</a>
                    </h2>
                    <p class="text-secondary mb-2 mb-md-3">
                        <a href="${user.html_url}" target="_blank">${user.login ?? ''}</a>
                    </p>
                    
                    <p class="fs-6 text-muted mb-1">
                        <a href="${user.html_url}?tab=followers" target="_blank">
                            <i class="bi bi-people me-1"></i>
                            <span class="text-dark fw-bold">${user.followers}</span> followers
                        </a>
                         &bullet; 
                        <a href="${user.html_url}?tab=following" target="_blank">
                            <span class="text-dark fw-bold">${user.following}</span> following
                        </a>
                    </p>

                    ${
                        user.email ? 
                        `<p class="fs-6 text-muted mb-2">
                            <a href="mailto:${user.email}" target="_blank">
                                <i class="bi bi-envelope me-1"></i> ${user.email}
                            </a>
                        </p>` : ''
                    }
                    
                </div>
            </div>
                
            <div id="repoResults" class="mt-3"></div>
        </div>
    </div>
    `)
}

export function repoTemplate(repo) {
    return (`
        <div class="card repo-card rounded-0">
            <div class="p-2">
                <div class="fs-65 mb-1">
                    <i class="bi bi-bookmarks text-secondary me-1"></i> 
                    <a href="${repo.html_url}" class="fw-bold me-2" target="_blank">${repo.name}</a>
                    ${ repo.visibility ? `<span class="badge rounded-pill border border-1 border-secondary-subtle fs-8 text-bg-light text-muted text-capitalize">${repo.visibility}</span>` : ''}
                    
                </div>

                ${ repo.description !== null ? `<p class="text-secondary fs-65 mb-2 fw-light">${repo.description}</p>` : ''}

                <p class="fs-7 text-muted mb-1 forks">
                    <a target="_blank" href="${repo.html_url}/stargazers">
                        <i class="bi bi-star me-1"></i>
                        <span class="text-muted fw-bold me-4">${repo.stargazers_count}</span> 
                    </a>

                    <a target="_blank" href="${repo.html_url}/forks">
                        <svg aria-label="fork" role="img" height="12" viewBox="0 0 12 12" version="1.1" width="12" data-view-component="true" class="text-muted">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                        </svg>
                        <span class="text-muted fw-bold">${repo.forks}</span> 
                    </a>
                </p>
            </div>
        </div>
    `)
}

export function skeleton() {
    return (`
        <div class="card skeleton shadow rounded-3 border-0 mx-auto">
            <div class="card-body">
                <div class="profile-img d-flex align-items-center">
                    <div class="bg-secondary rounded-circle img-thumbnail"></div>

                    <div class="ms-3 ms-md-4" style="width: 400px;">
                        <div class="mb-2 bg-secondary pt-4 rounded-2 w-75" ></div>
                        <div class="mb-3 mb-md-4 bg-secondary pt-3 rounded-2 w-50"></div>
                        <div class="d-flex gap-2 w-50 mb-3">
                            <div class="me-1 bg-secondary pt-2 rounded-2 w-50"></div>
                            <div class="bg-secondary pt-2 rounded-2 w-50"></div>
                        </div>
                        <div class="mb-2 bg-secondary pt-2 rounded-2 w-50"></div>
                    </div>
                </div>
                    
            <div id="repoResults" class="mt-3 border-bt">
                <div class="card repo-card rounded-0">
                    <div class="p-2" style="width: 100%;">
                        <div class="mb-3 bg-secondary pt-2 rounded-2 w-50"></div>
                        <div class="mb-1 bg-secondary pt-1 rounded-2 w-100"></div>
                        <div class="mb-3 bg-secondary pt-1 rounded-2 w-100"></div>

                        <div class="d-flex gap-2 w-25 mb-1">
                            <div class="me-1 bg-secondary pt-1 rounded-2 w-50"></div>
                            <div class="bg-secondary pt-1 rounded-2 w-50"></div>
                        </div>
                    </div>
                </div>

                <div class="card repo-card rounded-0">
                    <div class="p-2" style="width: 100%;">
                        <div class="mb-3 bg-secondary pt-2 rounded-2 w-50"></div>
                        <div class="mb-1 bg-secondary pt-1 rounded-2 w-100"></div>
                        <div class="mb-3 bg-secondary pt-1 rounded-2 w-100"></div>

                        <div class="d-flex gap-2 w-25 mb-1">
                            <div class="me-1 bg-secondary pt-1 rounded-2 w-50"></div>
                            <div class="bg-secondary pt-1 rounded-2 w-50"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
}