﻿namespace MyNotes.Models;

public class Note
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }

    public Note(string title, string description)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
        CreatedAt = DateTime.Now;
    }
}