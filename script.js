/**
 * script.js - SkillSwap Premium Data & Logic
 */

// ==========================================
// 1. DATA ARCHITECTURE (MOCK_DATA)
// ==========================================
const MOCK_DATA = {
    Users: [
        { id: 'usr_01', name: 'Alice Chen', badge: 'AC', skillsOffered: 'Python, Data Science', skillsWanted: 'Public Speaking', category: 'Programming', bio: 'Data scientist who loves automating the boring stuff. I need help presenting my findings.', rating: 4.9 },
        { id: 'usr_02', name: 'Marcus Reyes', badge: 'MR', skillsOffered: 'UI Design, Figma', skillsWanted: 'React JS', category: 'Design', bio: 'Product designer specializing in mobile apps. Looking to code my own prototypes.', rating: 4.8 },
        { id: 'usr_03', name: 'Elena Rostova', badge: 'ER', skillsOffered: 'Public Speaking', skillsWanted: 'Digital Marketing', category: 'Business', bio: 'TEDx speaker and communications coach. Need help marketing my new course.', rating: 5.0 },
        { id: 'usr_04', name: 'Chef Julian', badge: 'CJ', skillsOffered: 'Italian Cooking', skillsWanted: 'Video Editing', category: 'Lifestyle', bio: 'Executive chef wanting to start a YouTube channel. I can teach you pasta from scratch!', rating: 4.7 },
        { id: 'usr_05', name: 'Sarah Lin', badge: 'SL', skillsOffered: 'Conversational Mandarin', skillsWanted: 'Graphic Design', category: 'Language', bio: 'Native speaker offering immersive practice for beginners.', rating: 4.9 },
        { id: 'usr_06', name: 'David Kim', badge: 'DK', skillsOffered: 'React, Node.js', skillsWanted: 'Cooking', category: 'Programming', bio: 'Full-stack dev tired of ordering takeout. Teach me meal prep, I teach you code.', rating: 4.8 }
    ],
    
    SkillLibrary: [
        { title: 'Python', importance: 'The backbone of modern AI, scripting, and backend web development. Highly readable and versatile.', notes: [{n: 'Pandas setup guide', url:'#'}, {n: 'Regex Cheatsheet', url:'#'}, {n: 'Asyncio basic tutorial', url:'#'}] },
        { title: 'UI Design', importance: 'Good design determines product success. Understanding UX/UI allows you to build things people actually want to use.', notes: [{n: 'Figma Shortcuts', url:'#'}, {n: 'Color Theory 101', url:'#'}, {n: 'Auto-layout tricks', url:'#'}] },
        { title: 'Public Speaking', importance: 'Communication multiplies the value of your other skills. Essential for leadership and career growth.', notes: [{n: 'Overcoming Stage Fright', url:'#'}, {n: 'Structuring a TED Talk', url:'#'}, {n: 'Vocal warmups', url:'#'}] },
        { title: 'Cooking', importance: 'A fundamental life skill. Improves health, saves money, and brings joy to yourself and others.', notes: [{n: 'Knife selection guide', url:'#'}, {n: 'Flavor profiles matrix', url:'#'}, {n: 'Meal prep templates', url:'#'}] },
        { title: 'React JS', importance: 'The dominant frontend framework. Component-based architecture revolutionized UI development.', notes: [{n: 'Hooks explained natively', url:'#'}, {n: 'Context API vs Redux', url:'#'}, {n: 'Tailwind + React Setup', url:'#'}] },
        { title: 'Digital Marketing', importance: 'Building a great product isn\'t enough; people need to find it. SEO and marketing drive growth.', notes: [{n: 'SEO Fundamentals', url:'#'}, {n: 'FB Ads Bidding Strategy', url:'#'}, {n: 'Email copy templates', url:'#'}] },
        { title: 'Language (Mandarin)', importance: 'Opens communication with over a billion people. Crucial for international business and travel.', notes: [{n: 'Pinyin pronunciation', url:'#'}, {n: 'Most common 500 words', url:'#'}, {n: 'Tone practice audio', url:'#'}] },
        { title: 'Video Editing', importance: 'The primary medium of the internet. Storytelling through video is an incredibly powerful tool.', notes: [{n: 'Premiere Pro keybindings', url:'#'}, {n: 'Color grading basics', url:'#'}, {n: 'Audio leveling guide', url:'#'}] },
        { title: 'Graphic Design', importance: 'Visual communication is immediate. Good graphics build trust and brand identity.', notes: [{n: 'Typography pairing', url:'#'}, {n: 'Vector vs Raster', url:'#'}, {n: 'Logo design checklist', url:'#'}] },
        { title: 'Node.js', importance: 'Allows using JavaScript everywhere. Excellent for scalable, real-time backend systems.', notes: [{n: 'Express boilerplate', url:'#'}, {n: 'JWT Authentication', url:'#'}, {n: 'Connecting to MongoDB', url:'#'}] }
    ],

    Classes: [
        { id: 'c1', title: 'React Performance Masterclass', instructor: 'David Kim', date: 'Tomorrow, 2 PM EST', attendees: 12, img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80', active: true },
        { id: 'c2', title: 'Cooking: Knife Skills 101', instructor: 'Chef Julian', date: 'Thurs, 6 PM EST', attendees: 84, img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80', active: true },
        { id: 'c3', title: 'Figma Auto-Layout Deep Dive', instructor: 'Marcus Reyes', date: 'Saturday, 10 AM EST', attendees: 45, img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80', active: true },
        { id: 'c4', title: 'Overcoming Stage Fright', instructor: 'Elena Rostova', date: 'Monday, 5 PM EST', attendees: 120, img: 'https://images.unsplash.com/photo-1475721025505-c310a6bc3626?auto=format&fit=crop&w=600&q=80', active: false }
    ]
};

// ==========================================
// 2. NAVIGATION LOGIC (MapsTo Stack)
// ==========================================
let pageHistory = []; 
const VALID_PAGES = ['login-page', 'home-page', 'learner-dashboard', 'teacher-portal', 'resource-hub'];

function MapsTo(pageId, recordHistory = true) {
    if (!VALID_PAGES.includes(pageId)) return;

    // Determine current active page for history saving
    const currentActive = document.querySelector('.view-section.active');
    const currentId = currentActive ? currentActive.id : null;

    // If pushing to history stack
    if (recordHistory && currentId && currentId !== 'login-page' && currentId !== pageId) {
        pageHistory.push(currentId);
    }

    // Handle view switching
    document.querySelectorAll('.view-section').forEach(page => {
        page.classList.remove('active');
    });
    
    // Switch to targeted View
    const target = document.getElementById(pageId);
    if(target) {
        target.classList.add('active');
    }

    // Handle Global Navbar visibility behavior
    const globalNav = document.getElementById('global-nav');
    if (pageId === 'login-page') {
        globalNav.classList.add('hidden');
        pageHistory = []; // Always clear history on logout/login view
    } else {
        globalNav.classList.remove('hidden');
    }

    // Scroll top seamlessly without jumping animations
    window.scrollTo({ top: 0, behavior: 'instant' });
}

function goBack() {
    if (pageHistory.length > 0) {
        const previousPage = pageHistory.pop();
        MapsTo(previousPage, false); // false = don't record this specific back-nav iteration back into history
    } else {
        // If history empty natively fallback gracefully to Home root
        MapsTo('home-page', false);
    }
}


// ==========================================
// 3. RENDERING & COMPONENT BUILDERS
// ==========================================

// --- Learner Dashboard Renderings ---
function renderFilters() {
    const categories = [...new Set(MOCK_DATA.Users.map(u => u.category))];
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return;
    
    // Create the Default 'All' filter item map
    let html = `<button class="w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors bg-primary text-white shadow-md skill-filter" data-cat="all">All Categories</button>`;
    
    categories.forEach(cat => {
        html += `<button class="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors skill-filter border border-transparent hover:border-gray-200 mt-1" data-cat="${cat}">${cat}</button>`;
    });
    
    filtersContainer.innerHTML = html;
}

function renderMentorCards(users) {
    const grid = document.getElementById('mentors-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (users.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-gray-500 font-bold bg-white rounded-2xl border border-gray-100">No mentors found matching criteria. Refine Search.</div>`;
        return;
    }
    
    users.forEach((user, idx) => {
        const delay = `delay-${((idx % 4) + 1) * 100}`;
        const card = document.createElement('div');
        card.className = `bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary/40 hover:scale-105 transition-all w-full flex flex-col h-full animate-slide-up ${delay}`;
        
        card.innerHTML = `
            <div class="flex items-start gap-4 mb-5 border-b border-gray-100 pb-5">
                <div class="w-14 h-14 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-inner">${user.badge}</div>
                <div class="w-full min-w-0 pr-2">
                    <div class="flex justify-between items-center w-full min-w-full">
                        <h3 class="font-bold text-lg text-dark truncate mr-2">${user.name}</h3>
                        <span class="flex items-center text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1.5 rounded-md"><svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>${user.rating}</span>
                    </div>
                    <p class="text-xs text-gray-500 font-medium mt-0.5">ID: @${user.id}</p>
                </div>
            </div>
            
            <div class="flex-grow space-y-4">
                <div>
                    <h4 class="text-xs uppercase font-bold tracking-wider text-primary mb-1.5 flex gap-1 items-center"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Skills Offered</h4>
                    <p class="text-sm font-semibold text-gray-800 bg-gray-50 py-2 px-3 rounded-lg border border-gray-100">${user.skillsOffered}</p>
                </div>
                <div>
                    <h4 class="text-xs uppercase font-bold tracking-wider text-emerald mb-1.5 flex gap-1 items-center"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Skills Wanted</h4>
                    <p class="text-sm font-semibold text-emerald-800 bg-emerald-50 py-2 px-3 rounded-lg border border-emerald-100">${user.skillsWanted}</p>
                </div>
                <div class="pt-2">
                    <p class="text-sm text-gray-600 italic leading-snug border-l-2 border-primary pl-3 bg-white pr-2 py-1 text-ellipsis overflow-hidden">"${user.bio}"</p>
                </div>
            </div>
            
            <button onclick="alert('Message sent to ${user.name}!')" class="mt-6 w-full bg-white border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors shadow-sm">
                Connect & Swap
            </button>
        `;
        grid.appendChild(card);
    });
}

// --- Teacher Portal Submission Logic ---
function handleAddSkill(e) {
    e.preventDefault();
    const offer = document.getElementById('teach-skill-offer').value;
    const want = document.getElementById('teach-skill-want').value;
    const cat = document.getElementById('teach-category').value;
    const bio = document.getElementById('teach-importance').value;

    const newTeacher = {
        id: 'usr_new',
        name: 'Demo User',
        badge: 'DU',
        skillsOffered: offer,
        skillsWanted: want,
        category: cat,
        bio: bio,
        rating: 5.0
    };

    // Prepend object naturally to mocked Array
    MOCK_DATA.Users.unshift(newTeacher);

    // Build Preview Card dynamically in Teacher Portal Native screen
    const previewContainer = document.getElementById('new-skill-card-container');
    const previewWrapper = document.getElementById('new-skill-preview');
    
    previewContainer.innerHTML = `
        <div class="bg-white rounded-2xl p-6 border-2 border-emerald shadow-lg animate-pulse w-full">
            <div class="flex items-start gap-4 mb-4 border-b border-gray-100 pb-3">
                <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald flex items-center justify-center font-bold text-lg border border-emerald-200">${newTeacher.badge}</div>
                <div>
                    <h3 class="font-bold text-lg text-dark">${newTeacher.name}</h3>
                    <p class="text-xs text-emerald font-bold uppercase tracking-widest mt-0.5">Live Profile</p>
                </div>
            </div>
            <div class="mb-3">
                <span class="text-xs font-bold text-gray-400 block mb-1">OFFERS</span>
                <span class="font-semibold text-emerald bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">${newTeacher.skillsOffered}</span>
            </div>
             <div>
                <span class="text-xs font-bold text-gray-400 block mb-1">WANTS</span>
                <span class="font-semibold text-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">${newTeacher.skillsWanted}</span>
            </div>
        </div>
    `;
    
    previewWrapper.classList.remove('hidden');

    // Reset Forms safely
    e.target.reset();
    
    // Optional delay rendering array reset update natively back to Learner DB
    setTimeout(() => {
        renderMentorCards(MOCK_DATA.Users);
        // We do not auto-force user to learner view here to let them see their new post creation animation. 
        // But render DB matches in background automatically globally.
    }, 100);
}

// --- Resource Hub Netflix Builder ---
function renderClasses() {
    const scrollContainer = document.getElementById('classes-scroll');
    if(!scrollContainer) return;

    let html = '';
    MOCK_DATA.Classes.forEach(cls => {
        html += `
        <div class="flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:scale-105 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full snap-start relative">
            <div class="relative h-44 w-full">
                <div class="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent group-hover:opacity-60 transition-opacity z-10 w-full"></div>
                <img src="${cls.img}" alt="${cls.title}" class="w-full h-full object-cover">
                <div class="absolute top-3 left-3 z-20 flex gap-2 w-full">
                    <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-md border border-red-600"><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Live</span>
                    <span class="bg-dark/80 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md border border-gray-600">${cls.date}</span>
                </div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                     <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl text-red-500 transform scale-75 group-hover:scale-100 transition-transform">
                        <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6V4z"></path></svg>
                     </div>
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow w-full relative z-30 bg-white">
                <h4 class="font-bold text-lg text-dark mb-1 leading-tight group-hover:text-primary transition-colors">${cls.title}</h4>
                <p class="text-sm text-gray-500 font-medium mb-4 flex gap-1 items-center">
                   <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                   Inst. ${cls.instructor}
                </p>
                <div class="mt-auto flex justify-between items-center border-t border-gray-100 pt-4 w-full">
                    <span class="text-xs font-bold text-gray-500 flex items-center bg-gray-50 px-2 py-1 rounded"><svg class="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>${cls.attendees} attending</span>
                    <button class="text-sm text-white bg-primary px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 shadow-sm transition-colors">Join</button>
                </div>
            </div>
        </div>
        `;
    });
    scrollContainer.innerHTML = html;
}

// --- Resource Hub Database List View Builder ---
function renderLibraryNotes() {
    const list = document.getElementById('notes-list');
    if(!list) return;

    let html = '';
    MOCK_DATA.SkillLibrary.forEach((skill, i) => {
        // Toggle icon background colors rhythmically across items
        const bgIconColor = i % 2 === 0 ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600';
        
        let notesHtml = '';
        skill.notes.forEach(note => {
            notesHtml += `
                <a href="${note.url}" class="inline-flex items-center text-xs font-bold bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm text-gray-700 rounded-md px-3 py-1.5 transition-all whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer group/link">
                    <svg class="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-gray-400 group-hover/link:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                    ${note.n}
                </a>
            `;
        });

        html += `
            <li class="p-6 hover:bg-blue-50/50 transition-colors w-full flex flex-col justify-center">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full min-h-full">
                    <div class="flex items-start gap-5 flex-grow w-full">
                        <div class="w-12 h-12 rounded-2xl ${bgIconColor} shadow-md text-white flex items-center justify-center font-extrabold text-xl flex-shrink-0 relative overflow-hidden">
                            <span class="relative z-10">${skill.title.charAt(0)}</span>
                            <div class="absolute inset-0 bg-white opacity-20 transform -skew-x-12 translate-x-4"></div>
                        </div>
                        <div class="flex-grow w-full">
                            <h4 class="text-lg font-bold text-dark w-full mx-1">${skill.title}</h4>
                            <p class="text-sm text-gray-600 mt-1.5 leading-relaxed bg-white/50 rounded inline-block px-1 w-full max-w-2xl">${skill.importance}</p>
                            
                            <div class="mt-4 flex flex-wrap gap-2 w-full pt-2">
                                ${notesHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `;
    });
    list.innerHTML = html;
}

// ==========================================
// 4. INITIALIZATION & EVENT BINDINGS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // On Load Hydrate UI Data Arrays globally onto DOM
    renderFilters();
    renderMentorCards(MOCK_DATA.Users);
    renderClasses();
    renderLibraryNotes();

    // Attach Login Submission Bypass logic
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            MapsTo('home-page');
        });
    }

    // Attach Teacher Form Submission handler
    const teachForm = document.getElementById('add-skill-form');
    if (teachForm) {
        teachForm.addEventListener('submit', handleAddSkill);
    }

    // Dynamic Database Query Search Filtering System attached locally
    const searchInput = document.getElementById('mentor-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = MOCK_DATA.Users.filter(u => 
                u.name.toLowerCase().includes(term) ||
                u.skillsOffered.toLowerCase().includes(term) ||
                u.skillsWanted.toLowerCase().includes(term)
            );
            renderMentorCards(filtered);
        });
    }

    // Dynamic Category Filtering logic attached sequentially via Sidebar classes bindings
    setTimeout(() => { // slight async delay necessary since buttons were dynamically rendered DOM objects natively via JS setup.
        const filterBtns = document.querySelectorAll('.skill-filter');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Reset active styling state globally across instances bound context
                filterBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'shadow-md', 'border-transparent');
                    b.classList.add('text-gray-600', 'hover:bg-gray-100', 'border-transparent', 'hover:border-gray-200');
                });
                
                // Set the current target context Highlight properly
                const target = e.currentTarget;
                target.classList.remove('text-gray-600', 'hover:bg-gray-100', 'hover:border-gray-200');
                target.classList.add('bg-primary', 'text-white', 'shadow-md', 'border-transparent');

                // Cross Reference Check filtering logic internally
                const catInfo = target.getAttribute('data-cat');
                if (catInfo === 'all') {
                    renderMentorCards(MOCK_DATA.Users);
                } else {
                    const filtered = MOCK_DATA.Users.filter(u => u.category === catInfo);
                    renderMentorCards(filtered);
                }
            });
        });
    }, 150);

});
