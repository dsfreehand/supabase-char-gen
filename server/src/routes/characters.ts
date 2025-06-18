import { supabase } from '../config/supabaseClient'; // Adjust this path if needed
import { Character } from '../models/characterModel';
import { Request, Response, Router } from 'express';


const router = Router();

// Create a new character
router.post('/', async (req, res) => {
    try {
        const character: Omit<Character, 'id' | 'created_at'> = req.body;
        const { data, error } = await supabase
            .from('characters')
            .insert([character])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all characters
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from("characters").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// Get a single character by ID
router.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});


// Update a character by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates: Partial<Character> = req.body;

        const { data, error } = await supabase
            .from('characters')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a character by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('characters')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.status(200).json({ message: 'Character deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
