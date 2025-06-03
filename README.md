# 📚 Book Recommendation System

This is a frontend web application built with **Next.js**, designed to provide personalized book recommendations using **TF-IDF (Term Frequency–Inverse Document Frequency)**. The model leverages book metadata scraped from the [Best Books Ever list on Goodreads](https://www.goodreads.com/list/show/1.Best_Books_Ever).

> ⚠️ Note: This project primarily focuses on the **recommendation feature**. Other functionalities such as search and navigation may be partially implemented or contain known issues.

---

## 🧠 Project Overview

### 🔍 Data Source
- Scraped from: [Goodreads - Best Books Ever](https://www.goodreads.com/list/show/1.Best_Books_Ever)
- Collected data includes: Book titles, authors, genres, ratings, and descriptions.

### 📈 Recommendation Model
- The **TF-IDF** algorithm is used to compute similarity between books based on textual metadata such as descriptions.
- Recommendations are served through a REST API or loaded from local JSON files.
- 👉 For full details on the recommendation model, visit the [Backend Repository](https://github.com/chestharas/book_recommendation_api).

### 🎯 Frontend Objective
- Provide a clean, responsive user interface focused solely on delivering book recommendations.
- Users can select or input a book title to receive a list of similar books.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18 or later)
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/chestharas/book_recommendation_ui.git
cd your-repo
npm install

# Run 
npm run dev
```

Then open your browser and navigate to:

```
http://localhost:3000
```

---

## 🗂️ Project Structure

```
/components       → Reusable UI components
/pages            → Application pages and routes
/styles           → Global and component-level styling
/public           → Static assets
/utils            → TF-IDF helpers and utility functions
/data             → (Optional) Preloaded or mock book data
```

---

## 🧪 Example Usage

1. Launch the app.
2. Select or type in a book title.
3. View a list of recommended books generated using TF-IDF similarity.

---

## ⚠️ Known Issues

* 🔍 **Search functionality** may be incomplete or inconsistent.
* 🧭 **Navigation and filters** are under development or not fully functional.
* 🔌 Backend API (if applicable) should be running in parallel for dynamic data.

---

## 📚 Future Improvements

* Implement cosine similarity for better vector-based comparison.
* Fully integrate a live backend with updated book data and scraping capabilities.
* Enhance UI/UX with better interaction and accessibility.
* Add filters for genre, author, and user ratings.

---

## 📝 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

## 🤝 Acknowledgments

* [Goodreads](https://www.goodreads.com/) for providing publicly accessible book listings.
* [Scikit-learn](https://scikit-learn.org/) for TF-IDF modeling (used in the backend).
* Inspiration from traditional content-based recommendation systems.
