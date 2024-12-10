"use client";

import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userHomePage.css"; // Custom CSS for animations and additional styles

function UserHomePage() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleScrape = () => {
    console.log("Scrape clicked:", { url, prompt });
    // Add scraping functionality here
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center background-container">
      <div className="scrape-card p-4 rounded shadow-lg animated-fade-in">
        <h2 className="text-center mb-4 text-primary">Web Scraper</h2>
        <Form>
          <Form.Group controlId="urlInput" className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="promptInput" className="mb-3">
            <Form.Label>Prompt</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your scraping prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 scrape-button"
            onClick={handleScrape}
          >
            Scrape
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default UserHomePage;
