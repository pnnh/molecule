using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[AddComponentMenu("MyGame/Enemy")]
public class Enemy : MonoBehaviour
{
    public float m_speed = 1;
    public float m_life = 10;
    protected float m_rotSpeed = 30;
    protected Transform m_transform;
    internal Renderer m_renderer;
    internal bool m_isActive = false;
    public Transform m_explosionFX;
    public int m_point = 10;

    void Start()
    {
        m_transform = this.transform;
        m_renderer = this.GetComponent<Renderer>();
    }
    private void OnBecameVisible()
    {
        m_isActive = true;
    }

    // Update is called once per frame
    void Update()
    {
        UpdateMove();
        if(m_isActive && !this.m_renderer.isVisible)
        {
            Destroy(this.gameObject);
        }
    }

    protected virtual void UpdateMove()
    {
        float rx = Mathf.Sin(Time.time) * Time.deltaTime;
        m_transform.Translate(new Vector3(rx, 0, -m_speed * Time.deltaTime));
    }

    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("OnTriggerEnter");
        if(other.tag.CompareTo("PlayerRocket") == 0)
        {
            Debug.Log("PlayerRocket");
            Rocket rocket = other.GetComponent<Rocket>();
            if(rocket != null)
            {
                m_life -= rocket.m_power;
                if(m_life <= 0)
                {
                    GameManager.Instance.AddScore(m_point);
                    Instantiate(m_explosionFX, m_transform.position, Quaternion.identity);
                    Destroy(this.gameObject);
                }
            }
        } else if (other.tag.CompareTo("Player") == 0)
        {
            m_life = 0;
            Destroy(this.gameObject);
        }
    }
}
