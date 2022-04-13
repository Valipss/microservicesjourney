import {Post} from '../models/post';
import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({ providedIn: 'root' })
export class PostService {
    constructor(private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
    }

    async getUserPosts(skip: number, number: number) {
        const user = await this.userService.getUser();
        let request = await fetch(`http://localhost:3031/users/${user?.id}?$include[]={"name":"posts","include":["images"],"limit":100,"skip":0}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if (request.ok) {
            const data = await request.json();
            return data.posts;
        } else {
            this.snackBar.open('An error occurred when getting the posts.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            });
        }
    }

    async getPosts(skip: number, limit: number) {
        let request = await fetch('http://localhost:3031/posts?$include[]=images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if (request.ok) {
            return await request.json();
        } else {
            this.snackBar.open('An error occurred when getting the posts.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            });
        }
    }

    async getPost(postId: string) {
        let request = await fetch('http://localhost:3031/posts/' + postId + '?$include[]=images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        console.log(request);

        if (request.ok) {
            return await request.json()
        } else {
            this.snackBar.open('An error occurred when getting the post.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            });
        }
    }

    async createImage(image: { file: string | File; postId: string }) {
        console.log(image);
        let formData = new FormData();
        formData.append("file", image.file);
        formData.append("postId", image.postId);
        let request = await fetch('http://localhost:3031/images', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: formData
        });
        console.log(request);
        const res = await request.json();
        console.log(res);
        return request;
    }

    async createPost(post: Post) {
        console.log('create', post);
        let postId;

        let request = await fetch('http://localhost:3031/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify(post)
        });

        if (request.ok) {
            const data = await request.json();
            console.log(data);
            postId = data.id;
            if (post.file) {
                const imageRequest = await this.createImage({file: post.file!, postId: postId});
                if (imageRequest.ok) {
                    this.router.navigate(['dashboard']).then(() => {
                        this.snackBar.open('Your post have been created !', '', {
                            duration: 4000,
                            panelClass: ['success-snackbar']
                        });
                    });
                } else {
                    this.snackBar.open('An error occurred while creating the post :(', '', {
                        duration: 4000,
                        panelClass: ['danger-snackbar']
                    });
                }
            } else {
                this.router.navigate(['dashboard']).then(() => {
                    this.snackBar.open('Your post have been created !', '', {
                        duration: 4000,
                        panelClass: ['success-snackbar']
                    });
                });
            }
        } else {
            this.snackBar.open('An error occurred when creating the post.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            })
        }
    }

    async editPost(post: Post) {
        console.log('edit', post);
        let request = await fetch('http://localhost:3031/posts/' + post.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({title: post.title, body: post.body})
        });

        if (request.ok) {
            if (post.file) {
                const imageRequest = await this.createImage({file: post.file, postId: post.id!});
                if (imageRequest.ok) {
                    this.router.navigate(['dashboard']).then(() => {
                        this.snackBar.open('Your post have been modified !', '', {
                            duration: 4000,
                            panelClass: ['success-snackbar']
                        });
                    });
                } else {
                    this.snackBar.open('An error occurred while updating the post :(', '', {
                        duration: 4000,
                        panelClass: ['danger-snackbar']
                    });
                }
            } else {
                this.router.navigate(['dashboard']).then(() => {
                    this.snackBar.open('Your post have been modified !', '', {
                        duration: 4000,
                        panelClass: ['success-snackbar']
                    });
                });
            }
        } else {
            this.snackBar.open('An error occurred when creating the post.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            })
        }
    }

    async deletePost(id: string) {
        console.log('delete', id);
        let request = await fetch('http://localhost:3031/posts/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });

        if (request.ok) {
            this.snackBar.open('The post has been deleted', '', {
                duration: 4000,
                panelClass: ['success-snackbar']
            });
        } else {
            this.snackBar.open('An error occurred while deleting the post.', '', {
                duration: 4000,
                panelClass: ['danger-snackbar']
            })
        }
    }
}
