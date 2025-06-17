const CreateCharacter = () => {
  return (
    <div>
      <h1>Create a Character</h1>
      <form>
        <input type="text" placeholder="Character Name" required />
        <input type="text" placeholder="Race" required />
        <input type="text" placeholder="Class" required />
        <input type="number" placeholder="Level" required />
        <textarea placeholder="Traits"></textarea>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default CreateCharacter;
