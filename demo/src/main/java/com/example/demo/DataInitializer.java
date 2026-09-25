package com.example.demo.service;

import com.example.demo.entity.Author;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Post;
import com.example.demo.repository.AuthorRepository;
import com.example.demo.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AuthorRepository authorRepository;
    private final PostRepository postRepository;

    public DataInitializer(
            AuthorRepository authorRepository,
            PostRepository postRepository) {

        this.authorRepository = authorRepository;
        this.postRepository = postRepository;
    }

    @Override
    public void run(String... args) {

        System.out.println("========== DATA INITIALIZER STARTED ==========");

        if (postRepository.count() > 0) {
            System.out.println("Posts already exist. Skipping sample data.");
            return;
        }

        Author author1 = authorRepository.save(
                new Author("Prashant")
        );

        Author author2 = authorRepository.save(
                new Author("Rahul")
        );

        Author author3 = authorRepository.save(
                new Author("Aman")
        );

        Post post1 = new Post(
                "Introduction to Spring Boot",
                "Learning Spring Boot REST APIs.",
                author1,
                150,
                LocalDateTime.now().minusDays(5)
        );

        Post post2 = new Post(
                "Understanding JPA",
                "JPA makes database operations easier.",
                author2,
                230,
                LocalDateTime.now().minusDays(4)
        );

        Post post3 = new Post(
                "Database Optimization",
                "Indexes can improve database performance.",
                author1,
                320,
                LocalDateTime.now().minusDays(3)
        );

        Post post4 = new Post(
                "REST API Design",
                "Designing scalable REST APIs.",
                author3,
                180,
                LocalDateTime.now().minusDays(2)
        );

        Post post5 = new Post(
                "Caching in Spring Boot",
                "Caching can reduce database load.",
                author2,
                450,
                LocalDateTime.now().minusDays(1)
        );

        Post post6 = new Post(
                "Pagination Explained",
                "Pagination helps APIs handle large datasets.",
                author1,
                275,
                LocalDateTime.now()
        );

        postRepository.save(post1);
        postRepository.save(post2);
        postRepository.save(post3);
        postRepository.save(post4);
        postRepository.save(post5);
        postRepository.save(post6);

        System.out.println("========== 6 SAMPLE POSTS INSERTED ==========");
    }
}