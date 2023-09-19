import { posts, suggestUsers } from './database.js';
import { followers, renderPosts } from  './render.js';
import { newPost } from './newPost.js';
import { findfollower } from './botoes.js';

followers(suggestUsers);

renderPosts(posts);

newPost();

findfollower(suggestUsers);