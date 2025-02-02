# FAQ Management System for BharatFD with Docker setup

## Overview
This application allows users to manage Frequently Asked Questions (FAQs). It provides functionalities to add and retrieve FAQs in different languages like Telugu, Hindi, Kannada. The app utilizes **Redis** for caching FAQs and **MongoDB** for storing them.

The system uses **Docker** to run both the app and Redis in separate containers.

## Technologies Used
- **Node.js** - Server-side JavaScript runtime.
- **Express.js** - Web framework for Node.js.
- **MongoDB** - NoSQL database for storing FAQs.
- **Redis** - In-memory cache for FAQs.
- **Google Translate API** - For automatic translation of questions and answers.
- **Docker** - Containerization for easy deployment and management.

## Environment Setup with Docker

### Prerequisites
- **Docker** and **Docker Compose**(also WSL if it is a windows machine) installed on your machine.
- **MongoDB Atlas** cloud database setup. 

### Steps to Run with Docker
1. **Clone the Repository**:
   - git clone https://github.com/Chandra307/bharatFD.git and
   - cd BharatFD
2. **Create a .env File**: In the root of the project, create a *.env* file with the following content:
   `MONGO_CONNECTION_STRING=your_cloud_database_connection_string>`
3. Build and Start the Application: Using **Docker Compose**, you can build and run the app and Redis containers:
   `docker-compose up --build`
4. This would start the application server at http://localhost:5000
5. Redis and Node.js app would run in separate containers.
------------------------------------------------------------------------------------------------------------------
## API Usage using curl
1. Sample POST request:
   curl -X POST http://localhost:5000/faqs -H "Content-Type:application/json" -d '{ "question": "Where do you live?", "answer": "In the land where Ganges flows."}'
   *Response*: {
     "question": "Where do you live?",
     "answer": "In the land where Ganges flows.",
     "translations": {
         "te": {
             "question": "మీరు ఎక్కడ నివసిస్తున్నారు?",
             "answer": "గంగా ప్రవహించే భూమిలో."
         },
         "hi": {
             "question": "आप कहाँ रहते हैं?",
             "answer": "उस भूमि में जहां गंगा बहता है।"
         },
         "kn": {
             "question": "ನೀವು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?",
             "answer": "ಗಂಗಾ ಹರಿಯುವ ಭೂಮಿಯಲ್ಲಿ."
         }
     }
   }

2. Sample GET request (optional language parameter):
   curl -X GET http://localhost:5000/faqs
   *Response*: All FAQs fetched in english.
3. Sample GET request with a language query parameter:
   curl -X GET http://localhost:5000/faqs?lang=te
   curl -X GET http://localhost:5000/faqs?lang=hi
   curl -X GET http://localhost:5000/faqs?lang=kn
   *Response*: FAQs translated into specific language.
