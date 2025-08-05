*`useState` is a **React Hook** used to manage local component state*. *This is how React remembers things like form input or loading state.*

```js
const [formData, setFormData] = useState({...});
```
- Holds form input values (first name, email, etc.)
- `formData` is the current value
- `setFormData` is the function to change `formData`

```js
const [isLoading, setIsLoading] = useState(false);
```
- Indicates if the form is submitting/loading.