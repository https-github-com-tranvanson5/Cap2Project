package com.example.backend.blog.repository;

import com.example.backend.blog.constain.CommentStatus;
import com.example.backend.blog.model.Blog;
import com.example.backend.blog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CommentRepository extends JpaRepository<Comment,String> {
    Set<Comment> findByBlogAndRepcommentAndStatus(Blog blog,Boolean repcomment,CommentStatus status);
    Set<Comment> findByCommentIdAndRepcommentAndStatus(String commentId, Boolean repcomment, CommentStatus status);
}
